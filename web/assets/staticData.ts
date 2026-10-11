import type { ChipRowData } from "../components/molecules/ChipRow.tsx";
import type { ProjectData } from "../components/molecules/ProjectCard.tsx";

export type IconLinkData = {name: string, deviconName?: string, url: string}


interface StaticData {
	stackChipRows: ChipRowData[];
	socialLinks: IconLinkData[];
	projects: ProjectData[];
	resumeLinks: {
		cs: string,
		en: string
	}
}

const data: StaticData = {
	stackChipRows: [{
		label: "Frontend", chips: [
			{ name: "React" },
			{ name: "Tailwind", deviconName: "tailwindcss" },
			{ name: "TypeScript" }
		],
	}, {
		label: "Backend", chips: [
			{ name: "Node.js", deviconName: "nodejs" },
			{ name: "Express.js", deviconName: "express" },
			{ name: "SQLite" },
			{ name: "Vitest" },
			{ name: "C" }
		]
	}, {
		label: "Tools", chips: [
			{ name: "Git" },
			{ name: "GitHub Actions", deviconName: "githubactions" },
			{ name: "Cloudflare" },
		]
	}],
	socialLinks: [
		{ name: "GitHub", url: "https://github.com/olda28" },
		{ name: "LinkedIn", url: "https://www.linkedin.com/in/oliver-nov%C3%A1k/" }
	],
	projects: [{
		heading: "slabihoudova-foto.cz",
		description: "A photography portfolio with dynamically pre-rendered photos, built for a client.",
		githubRepo: "olda28/slabihoudova-foto.cz",
		liveUrl: "https://slabihoudova-foto.cz/",
		technologies: ["react", "tailwindcss", "typescript", "nodejs", "cloudflare"]
	}, {
		heading: "Cryptopals solutions",
		description: "Everyone knows 'how' basic encryption should work - but could you actually crack it yourself?\n\nSolutions to the challenges in pure C.",
		githubRepo: "olda28/cryptopals-c",
		technologies: ["c"]
	}, {
		heading: "Nand2Tetris: Bit by bit",
		description: "Imagine you know a single logic gate: NAND. Now you go and build a computer from just that.\n\nAn interactive companion GitBook to the Nand2Tetris project.",
		githubRepo: "olda28/nand2tetris",
		liveUrl: "https://olda28.gitbook.io/nand2tetris",
		technologies: ["gitbook"]
	}],
	resumeLinks: {
		cs: "/Novák-CV.cs.pdf",
		en: "/Novak-CV.en.pdf"
	}
}
export default data;
