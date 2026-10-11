import * as React from "react";
import { useEffect, useState } from "react";
import StaticData from "../../assets/staticData.ts";
import staticData from "../../assets/staticData.ts";
import IconLink from "../atoms/IconLink.tsx";
import { TypewriterText } from "../atoms/TypewriterText.tsx";
import ChipRow from "../molecules/ChipRow.tsx";
import SpotifyBanner from "../molecules/SpotifyBanner.tsx";

const Hero = () => {
	const [titleFinished, setTitleFinished] = useState(false);
	const [subtitleFinished, setSubtitleFinished] = useState(false);

	useEffect(() => {
		document.getElementById("projects-btn")!.addEventListener("click", () => {
			document.getElementById("projects")!.scrollIntoView({ behavior: "smooth" });
		})
	}, []);

	function downloadResume(lang: keyof typeof StaticData.resumeLinks) {
		window.open(staticData.resumeLinks[lang], "_blank");
	}

	const [droppedResumes, setDroppedResumes] = useState(false);

	function dropdownResumes(e: React.MouseEvent<HTMLButtonElement>) {
		if (droppedResumes) return downloadResume("en");
		const top = e.target as HTMLButtonElement;
		top.textContent = "🇬🇧 Resume"
		setDroppedResumes(true);
	}

	return (
		<>
			<div id="grid"
				 className="bg-[url('assets/grid.svg')] bg-size-[60px] z-0 fixed inset-0 pointer-events-none "/>
			<div className="flex min-h-screen flex-col text-slate-200 transition-all duration-500 h-fit">
				<main id="hero"
					  className="relative z-10 flex grow items-center px-8 pt-16 pb-2 md:px-16 md:pt-24 md:pb-4">
					<div className="mx-auto flex w-full max-w-6xl flex-col items-center gap-20 md:flex-row">
						<div id="hero-left" className="flex flex-1/2 flex-col gap-6">
							<p className="text-sm leading-none font-medium tracking-[0.2em] text-indigo-600 uppercase md:text-lg">
								Hello, I'm
							</p>

							<h1 id="title"
								className="bg-linear-to-r bg-(image:--gradient-name) bg-clip-text pb-0.5 text-6xl leading-none font-medium whitespace-pre-wrap md:text-7xl lg:text-8xl">
								<TypewriterText delayMs={50} withCursor setFinished={setTitleFinished}
												waitAfterFinishMs={200}>
									{"Oliver\nNovák"}
								</TypewriterText>
							</h1>

							<p id="subtitle" className="text-base leading-none font-normal text-slate-500 md:text-lg">
								<TypewriterText delayMs={17} withCursor setFinished={setSubtitleFinished}
												waitAfterFinishMs={300} waitFor={titleFinished}>
									full-stack developer | programmer |&nbsp;&nbsp;🇨🇿
								</TypewriterText>
							</p>
							<div id="buttonsrow" className="item-center mt-2 flex gap-8 max-xs:flex-col">
								<div id="buttons" className="flex gap-3 relative">
									<div className="flex">
										<button onClick={dropdownResumes}
												className={`${subtitleFinished && "slidein"} ${droppedResumes ? "px-6" : "px-5"}
											invisible cursor-pointer rounded-lg bg-linear-to-br from-[rgb(91,33,182)] to-[rgb(124,58,237)] py-2.5 text-sm font-semibold tracking-wide text-white shadow-button transition-all duration-200 hover:-translate-y-px hover:from-[rgb(76,29,149)] hover:to-[rgb(109,40,217)] hover:shadow-button-hover`}>
											Resume
										</button>
										<button onClick={() => downloadResume("cs")}
												className={`${droppedResumes ? "top-[120%] opacity-100" : "top-0 invisible opacity-0"}
											absolute cursor-pointer rounded-lg bg-linear-to-br from-[rgb(91,33,182)] to-[rgb(124,58,237)] px-5 py-2.5 text-sm font-semibold tracking-wide text-white shadow-button transition-all duration-200 hover:from-[rgb(76,29,149)] hover:to-[rgb(109,40,217)] hover:shadow-button-hover`}>
											🇨🇿 Životopis
										</button>
									</div>
									<button
										id="projects-btn"
										className={`${subtitleFinished && "slidein-sec"} invisible cursor-pointer rounded-lg border border-indigo-500/25 bg-transparent px-5 py-2.5 text-sm font-semibold tracking-wide text-slate-400 transition-all duration-200 hover:-translate-y-px hover:border-indigo-300/50 hover:bg-indigo-500/10 hover:text-indigo-300`}>
										My Projects
									</button>
								</div>
								<div id="links"
									 className={`${subtitleFinished && "slidein-thr"} invisible flex gap-6 items-center max-xs:pl-1 max-xs:gap-4`}>
									{staticData.socialLinks.map((link, i) => (
										<IconLink key={i} link={link} iconHeightPx={25}/>
									))}
								</div>
							</div>
						</div>
						<div id="hero-right"
							 className="flex flex-1/2 flex-col gap-4 max-xs:w-full xs:max-sm:w-4/5 sm:max-md:w-3/5">
							<div id="stack"
								 className="flex flex-col gap-5 rounded-xl border border-card-border bg-slate-900/90 p-6 shadow-card backdrop-blur-md">
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
