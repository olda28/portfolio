import staticData from "../../assets/staticData.ts";
import ChipRow from "../molecules/ChipRow.tsx";
import {useState} from "react";
import {TypewriterText} from "../atoms/TypewriterText.tsx";
import SpotifyBanner from "../molecules/SpotifyBanner.tsx";
import SvgDevicon from "../atoms/SvgDevicon.tsx";
import TooltipForEach from "../atoms/TooltipForEach.tsx";

const Hero = () => {
	const [titleFinished, setTitleFinished] = useState(false);
	const [subtitleFinished, setSubtitleFinished] = useState(false);

	return (
		<>
			<div id="grid"
				 className="bg-[url('assets/grid.svg')] bg-size-[60px] z-0 fixed inset-0 pointer-events-none "/>
			<div className="flex h-full min-h-screen flex-col text-slate-200 transition-all duration-500">
				<main id="hero" className="relative z-10 flex grow items-center px-8 py-16 md:px-16 md:py-24">
					<div className="mx-auto flex w-full max-w-6xl flex-col items-center gap-20 md:flex-row">
						<div id="hero-left" className="flex flex-1/2 flex-col gap-6">
							<p className="text-sm leading-none font-medium tracking-[0.2em] text-indigo-600 uppercase md:text-lg">
								Hello, I'm
							</p>

							<h1 id="title"
								className="bg-linear-to-r bg-(image:--gradient-name) bg-clip-text pb-0.5 text-6xl leading-none font-medium whitespace-pre-wrap md:text-7xl lg:text-8xl">
								<TypewriterText delayMs={75} withCursor setFinished={setTitleFinished}
												waitAfterFinishMs={500}>
									{"Oliver\nNovák"}
								</TypewriterText>
							</h1>

							<p id="subtitle" className="text-base leading-none font-normal text-slate-500 md:text-lg">
								<TypewriterText delayMs={25} withCursor setFinished={setSubtitleFinished}
												waitAfterFinishMs={400} waitFor={titleFinished}>
									full-stack developer&nbsp;&nbsp;|&nbsp;&nbsp;programmer
								</TypewriterText>
							</p>
							<div id="buttonsrow" className="item-center mt-2 flex gap-8 max-xs:flex-col">
								<div id="buttons" className="flex gap-3">
									<button
										className={`${subtitleFinished && "slidein"} invisible cursor-pointer rounded-lg bg-linear-to-br from-[rgb(91,33,182)] to-[rgb(124,58,237)] px-5 py-2.5 text-sm font-semibold tracking-wide text-white shadow-button transition-all duration-200 hover:-translate-y-px hover:from-[rgb(76,29,149)] hover:to-[rgb(109,40,217)] hover:shadow-button-hover`}>
										Resume
									</button>
									<button
										className={`${subtitleFinished && "slidein-sec"} invisible cursor-pointer rounded-lg border border-indigo-500/25 bg-transparent px-5 py-2.5 text-sm font-semibold tracking-wide text-slate-400 transition-all duration-200 hover:-translate-y-px hover:border-indigo-300/50 hover:bg-indigo-500/10 hover:text-indigo-300`}>
										My Projects
									</button>
								</div>
								<div id="links" className={`${subtitleFinished && "slidein-thr"} invisible flex gap-6 items-center`}>
									<TooltipForEach>
										{staticData.socialLinks.map((link, i) => (
											<a key={i} href={link.url} data-tooltip={link.name} target="_blank"><SvgDevicon height={25} name={link.deviconName || link.name.toLowerCase()}/></a>
										))}
									</TooltipForEach>
								</div>
							</div>
						</div>
						<div id="hero-right" className="flex flex-1/2 flex-col gap-4 max-xs:w-full xs:max-sm:w-4/5 sm:max-md:w-3/5">
							<div id="stack" className="flex flex-col gap-5 rounded-xl border border-card-border bg-slate-900/90 p-6 shadow-card backdrop-blur-md">
								{staticData.stackChipRows.map((chipRowData) => {
									return <ChipRow key={chipRowData.label} iconSizePx={18} {...chipRowData}></ChipRow>
								})}
							</div>
							<SpotifyBanner/>
						</div>
					</div>
				</main>
			</div>
		</>
	)
}
export default Hero;
