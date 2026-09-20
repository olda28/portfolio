import {env} from "cloudflare:workers";
import axios, {AxiosInstance} from "axios";

const { SPOTIFY_BASIC_AUTH, SPOTIFY_REFRESH_TOKEN } = env;

export interface SongData {
	artist: string;
	name: string;
}

type CurrentlyPlayingType = "track"|"episode"|"ad"|"unknown";
type TrackObject = {
	artists: { name: string	}[];
	name: string;
}

export class SpotifyAPI {
	private tokenPromise?: Promise<string>;
	private token?: string;
	private tokenExpiresAt = 0;

	private client: AxiosInstance;

	constructor(){
		this.client = axios.create({
			adapter: "fetch",
			fetchOptions: {
				cache: "no-cache"
			}
		})
	}

	async getCurrentSongReq(token: string): Promise<AxiosResponse>{
		return await this.client.get("https://api.spotify.com/v1/me/player/currently-playing", {
			headers: {
				Authorization: `Bearer ${token}`
			}
		})
	}

	async getCurrentSong(): Promise<SongData|null> {
		let token = await this.getValidToken();

		let res = await this.getCurrentSongReq(token);

		// User revoked token before request completed - single retry
		if (res.status === 401){
			this.tokenExpiresAt = 0; // this will force this.getValidToken() to re-fetch token
			return await this.getCurrentSong(); // try again
			res = await this.getCurrentSongReq(token);
		}
		if (res.status !== 200) return null;

		const data = res.data;
		const isPlaying = data.is_playing as boolean;
		const playingType = data.currently_playing_type as CurrentlyPlayingType;

		if (!isPlaying || playingType !== "track") return null;
		const trackData = data.item as TrackObject;
		return {
			artist: trackData.artists.slice(0, 2).map(a => a.name).join(", "),
			name: trackData.name,
		}
	}

	private async getValidToken(): Promise<string>{
		if (this.token && Date.now() <= this.tokenExpiresAt){
			return this.token;
		}

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
		console.log("fetchToken called");
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

		this.token = data.access_token;
		this.tokenExpiresAt = Date.now() + (data.expires_in*1000) - 60_000; // Internally expire a minute before real expiration

		return data.access_token;
	}
}
