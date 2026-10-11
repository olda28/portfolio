import staticData from "../../assets/staticData.ts";
import ProjectCard from "../molecules/ProjectCard.tsx"

const Projects = () => {
	return <div id="projects" className="px-8 pb-16 font-worksans text-white md:px-16 md:pb-24">
		<h1 className="mb-10 text-5xl font-medium max-md:text-center">My Projects</h1>
		<div className="grid grid-cols-2 gap-10 max-sm:grid-cols-1">
			{staticData.projects.map((proj, i) => <ProjectCard key={i} {...proj}/>)}
		</div>
	</div>
}
export default Projects;
