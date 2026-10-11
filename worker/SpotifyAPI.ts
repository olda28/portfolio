// noinspection SqlResolve

import {env} from "cloudflare:workers";
import axios, {type AxiosInstance, type AxiosResponse} from "axios";

const { SPOTIFY_BASIC_AUTH, SPOTIFY_REFRESH_TOKEN } = env;

interface StoredToken {
	token: string;
	expires_at: number;
}

export interface SongData {
	artist: string;
	name: string;
}

// https://developer.spotify.com/documentation/web-api/reference/get-the-users-currently-playing-track
type CurrentlyPlayingType = "track"|"episode"|"ad"|"unknown";
type TrackObject = {
	artists: { name: string	}[];
	name: string;
}
// ***

const REFRESH_INTERVAL = 10000 // in milliseconds

export class SpotifyAPI {
	private tokenPromise?: Promise<string>;
	private token?: string;
	private tokenExpiresAt = 0;

	private lastSongFetch = 0;
	private lastResponse?: SongData;

	private sql: SqlStorage;
	private client: AxiosInstance;

	constructor(sql: SqlStorage){
		this.client = axios.create({
			adapter: "fetch",
			fetchOptions: {
				cache: "no-cache"
			}
		})
		this.sql = sql;
	}

	async getCurrentSongReq(token: string): Promise<AxiosResponse>{
		return await this.client.get("https://api.spotify.com/v1/me/player/currently-playing", {
			headers: {
				Authorization: `Bearer ${token}`
			}
		})
	}

	async getCurrentSong(): Promise<SongData|null> {
		if (this.lastResponse && (this.lastSongFetch-Date.now()) < REFRESH_INTERVAL){
			return this.lastResponse;
		}

		let token = await this.getValidToken();

		let res = await this.getCurrentSongReq(token);

		// User revoked token before request completed - single retry
		if (res.status === 401){
			this.clearToken();
			token = await this.getValidToken();
			res = await this.getCurrentSongReq(token);
		}
		if (res.status !== 200) return null;

		const data = res.data;
		const isPlaying = data.is_playing as boolean;
		const playingType = data.currently_playing_type as CurrentlyPlayingType;

		if (!isPlaying || playingType !== "track") return null;
		const trackData = data.item as TrackObject;

		const returnData = {
			artist: trackData.artists.slice(0, 2).map(a => a.name).join(", "),
			name: trackData.name,
		}
		this.lastResponse = returnData;
		this.lastSongFetch = Date.now();
		return returnData;
	}

	private async getValidToken(): Promise<string>{
		// L1 Cache: in-memory
		if (this.token && Date.now() <= this.tokenExpiresAt){
			console.debug("[SpotifyAPI] L1 Cache HIT (in-memory)")
			return this.token;
		}
		// ***

		if (this.tokenPromise) {
			return this.tokenPromise;
		}

		this.tokenPromise = this.fetchToken();

		try {
			return await this.tokenPromise;
		} finally {
			this.tokenPromise = undefined;
		}
	}

	private async fetchToken(): Promise<string> {
		// L2 Cache - DurableObject SQL Storage
		const tokenRow = this.sql.exec<{
			token: string;
			expires_at: number;
		}>(`
			SELECT token, expires_at
			FROM tokens
			WHERE id = 1
		`).toArray()[0] as StoredToken;

		if (tokenRow && Date.now() < tokenRow.expires_at) {
			console.debug("[SpotifyAPI] L2 Cache HIT (DO SQL)")
			this.token = tokenRow.token;
			this.tokenExpiresAt = tokenRow.expires_at;
			return tokenRow.token;
		}
		// ***

		// Cache MISS - refetch from OAuth2 endpoint
		console.debug("[SpotifyAPI] Cache MISS - refetch")
		const newTokenRes = await this.client.post("https://accounts.spotify.com/api/token",
			new URLSearchParams({ grant_type: "refresh_token", refresh_token: SPOTIFY_REFRESH_TOKEN }),
			{
				headers: {
					"Content-Type": "application/x-www-form-urlencoded",
					"Authorization": `Basic ${SPOTIFY_BASIC_AUTH}`
				}
			});

		const data = newTokenRes.data;
		if (newTokenRes.status === 400 && data.error === "invalid_grant") {
			throw new Error("Refresh token expired!")
		}
		if (newTokenRes.status !== 200 || !data.access_token){
			throw new Error(JSON.stringify(newTokenRes.data));
		}

		// Internally expire a minute before real expiration - safety buffer
		const tokenExpiresAt = Date.now() + (data.expires_in*1000) - 60_000;
		this.token = data.access_token;
		this.tokenExpiresAt = tokenExpiresAt;

		this.sql.exec(`
			INSERT OR REPLACE INTO tokens
			(id, token, expires_at)
			VALUES (1, ?, ?)`, data.access_token, tokenExpiresAt
		);

		return data.access_token;
	}
	private clearToken(){
		this.token = undefined;
		this.tokenExpiresAt = 0;
		this.sql.exec("DELETE FROM tokens WHERE id = 1");
	}
}
