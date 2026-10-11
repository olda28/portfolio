import { useState } from "react";
import IconLink from "../atoms/IconLink.tsx";
import ReadmeOverlay from "../atoms/ReadmeOverlay.tsx";
import SvgDevicon from "../atoms/SvgDevicon.tsx";

export interface ProjectData {
	heading: string;
	description: string;
	technologies: string[];
	githubRepo: string;
	liveUrl?: string;
}

const ProjectCard = ({ heading, description, technologies, githubRepo, liveUrl }: ProjectData) => {
	const [hideOverlay, setHideOverlay] = useState(true);
	return <>
		<div
			className="cursor-pointer rounded-xl border border-card-border bg-slate-900/90 px-7 py-7 shadow-card backdrop-blur-none transition-all hover:scale-102 flex flex-col justify-between"
			onClick={() => setHideOverlay(false)}>
			<div className="flex flex-col">
				<h3 className="pb-2 text-2xl font-medium">{heading}</h3>
				<p className="pb-5 font-normal whitespace-pre-line text-[#cbd5e1]">{description}</p>
			</div>
			<div className="flex items-center justify-between flex-wrap gap-x-14 gap-y-6">
				<div className="flex gap-3">
					{technologies.map((tech, i) => <SvgDevicon key={i} name={tech} height={30}/>)}
				</div>
				<div className="flex gap-3">
					{liveUrl &&
						<IconLink link={{ url: liveUrl, name: "View live", deviconName: "web" }} iconHeightPx={25}/>}
					<IconLink
						link={{
							url: `https://github.com/${githubRepo}`,
							name: "View on GitHub",
							deviconName: "github"
						}}
						iconHeightPx={25}/>
				</div>
			</div>
		</div>
		<ReadmeOverlay visible={!hideOverlay} repo={githubRepo} live={liveUrl} onClose={() => setHideOverlay(true)}/>
	</>
}
export default ProjectCard
