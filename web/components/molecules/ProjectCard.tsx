import { useState } from "react";
import IconLink from "../atoms/IconLink.tsx";
import ReadmeOverlay from "../atoms/ReadmeOverlay.tsx";
import SvgDevicon from "../atoms/SvgDevicon.tsx";

export interface ProjectData {
	heading: string;
	description: string;
	technologies: string[];
	githubRepo: string;
}

const ProjectCard = ({ heading, description, technologies, githubRepo }: ProjectData) => {
	const [hideOverlay, setHideOverlay] = useState(true);
	return <>
		<div
			className="cursor-pointer rounded-xl border border-card-border bg-slate-900/90 px-7 py-7 shadow-card backdrop-blur-none transition-all hover:scale-102"
			onClick={() => setHideOverlay(false)}>
			<h3 className="pb-2 text-2xl">{heading}</h3>
			<p className="pb-5 font-light whitespace-pre-line">{description}</p>
			<div className="flex items-center justify-between">
				<div className="flex">
					{technologies.map((tech, i) => <SvgDevicon key={i} name={tech} height={30}/>)}
				</div>
				<div className="flex">
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
		<ReadmeOverlay visible={!hideOverlay} repo={githubRepo} onClose={() => setHideOverlay(true)}/>
	</>
}
export default ProjectCard
