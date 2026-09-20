import {DurableObject} from "cloudflare:workers";
import {type SongData, SpotifyAPI} from "./SpotifyAPI";


export class SpotifyObject extends DurableObject<Env> {
	private readonly api: SpotifyAPI;

	constructor(ctx: DurableObjectState, env: Env) {
		super(ctx, env);

		// noinspection JSIgnoredPromiseFromCall
		ctx.blockConcurrencyWhile(async () => {
			ctx.storage.sql.exec(`
				CREATE TABLE IF NOT EXISTS tokens (
					id INTEGER PRIMARY KEY,
					token TEXT NOT NULL,
					expires_at INTEGER NOT NULL
				)
			`)
		})

		this.api = new SpotifyAPI(ctx.storage.sql);
	}

	async getCurrentSong(): Promise<SongData|null>{
		return await this.api.getCurrentSong();
	}
}
