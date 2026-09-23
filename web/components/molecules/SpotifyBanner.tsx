import SvgDevicon from "../atoms/SvgDevicon.tsx";
import type {SongData} from "@/worker/SpotifyAPI.ts";
import {useEffect, useState} from "react";

const API_BASE = import.meta.env.MODE === "development" ? "https://portfolio.oliverovi-novakovi.workers.dev" : ""

export default function SpotifyBanner() {
	const [songdata, setSongdata] = useState<SongData|null>(null);
	useEffect(() => {
		const fetchSongData = () => {
			fetch(API_BASE + "/api/getCurrentSong")
				.then(res => {
					if (res.status === 204) return setSongdata(null);
					res.json().then(data => {
						setSongdata(data as SongData);
					})
				})
		}
		fetchSongData();
		const int = setInterval(fetchSongData, 5*1000);
		return () => clearInterval(int);
	}, [])
	return (
		<div className={`appear-wrapper ${songdata ? "visible" : ""}`}>
			<div
				className="flex items-center gap-3 rounded-xl border border-card-border bg-slate-900/60 shadow-card backdrop-blur-md max-xs:gap-4">
				<div className="flex h-4.5 shrink-0 items-end gap-0.75">
					{["bar1", "bar2", "bar3", "bar4"].map((key) => (
						<span key={key} className={`${key} inline-block w-0.75 rounded-sm bg-green-500`}/>
					))}
				</div>
				<SvgDevicon name="spotify" height={18} breakpointCSS="max-2xs:hidden"/>
				<div className="flex flex-col overflow-hidden">
                <span className="text-xs font-normal tracking-wide text-gray-400 uppercase">
                    what i'm listening to
                </span>
					<span className="truncate text-sm font-semibold text-gray-200">
                    {songdata && songdata.name}
						<span className="font-normal">
                        {" — "}{songdata && songdata.artist}
                    </span>
                </span>
				</div>
			</div>
		</div>
	)
}
