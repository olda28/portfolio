import {DurableObject} from "cloudflare:workers";
import {SongData, SpotifyAPI} from "./SpotifyAPI";


export class SpotifyObject extends DurableObject<Env> {
	private readonly api: SpotifyAPI;

	constructor(ctx: DurableObjectState, env: Env) {
		super(ctx, env);
		this.api = new SpotifyAPI();
	}

	async getCurrentSong(): Promise<SongData|null>{
		return await this.api.getCurrentSong();
	}
}
