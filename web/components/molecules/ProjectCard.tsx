import SvgDevicon from "../atoms/SvgDevicon.tsx";
import IconLink from "../atoms/IconLink.tsx";
import {useState} from "react";
import ReadmeOverlay from "../atoms/ReadmeOverlay.tsx";

export interface ProjectData {
	heading: string;
	description: string;
	technologies: string[];
	githubRepo: string;
}

const ProjectCard = ({heading, description, technologies, githubRepo}: ProjectData) => {
	const [hideOverlay, setHideOverlay] = useState(true);
	return <>
		<div className="project px-7 py-7 border border-card-border rounded-xl bg-slate-900/90 shadow-card backdrop-blur-none cursor-pointer hover:scale-105 transition-all" onClick={() => setHideOverlay(false)}>
			<h3 className="text-2xl pb-2">{heading}</h3>
			<p className="font-light pb-5 whitespace-pre-line">{description}</p>
			<div className="flex justify-between items-center">
				<div className="flex">
					{technologies.map((tech, i) => <SvgDevicon key={i} name={tech} height={30}/> )}
				</div>
				<div className="flex">
					<IconLink link={{url: `https://github.com/${githubRepo}`, name: "View on GitHub", deviconName: "github"}} iconHeightPx={25}/>
				</div>
			</div>
		</div>
		<ReadmeOverlay visible={!hideOverlay} repo={githubRepo} onClose={() => setHideOverlay(true)} />
	</>
}
export default ProjectCard
