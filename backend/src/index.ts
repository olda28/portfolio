import express from "express";
import {httpServerHandler} from "cloudflare:node";
import {env} from "cloudflare:workers";

const app = express();
app.use(express.json());

app.get("/getCurrentSong", async (req, res) => {
	const api = env.SPOTIFY.getByName("main");

	const songData = await api.getCurrentSong();

	if (songData == null) {
		res.sendStatus(204);
	} else {
		res.json(songData);
	}
})

app.listen(3000);
export default httpServerHandler({port: 3000});


export { SpotifyObject } from "./SpotifyObject";
