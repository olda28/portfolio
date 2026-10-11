import staticData from "../../assets/staticData.ts";
import ProjectCard from "../molecules/ProjectCard.tsx"

const Projects = () => {
	return <div id="projects" className="font-worksans text-white px-8 py-16">
		<h1 className="text-5xl mb-10 font-medium">My Projects</h1>
		<div className="grid grid-cols-2 max-sm:grid-cols-1 gap-10">
			{staticData.projects.map((proj, i) => <ProjectCard key={i} {...proj}/>) }
		</div>
	</div>
}
export default Projects;
