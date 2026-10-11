import type {ChipRowData} from "../components/molecules/ChipRow.tsx";
import type {ProjectData} from "../components/molecules/ProjectCard.tsx";

export type IconLinkData = { name: string, deviconName?: string, url: string }


interface StaticData {
    stackChipRows: ChipRowData[];
	socialLinks: IconLinkData[];
	projects: ProjectData[];
}

const data: StaticData = {
    stackChipRows: [{
            label: "Frontend", chips: [
                {name: "React"},
                {name: "Tailwind", deviconName: "tailwindcss"},
                {name: "TypeScript"}
            ],
        }, {
            label: "Backend", chips: [
                {name: "Node.js", deviconName: "nodejs"},
                {name: "Express.js", deviconName: "express"},
                {name: "SQLite"},
                {name: "Vitest"},
                {name: "Rust"}
            ]
        }, {
            label: "Tools", chips: [
                {name: "Git"},
                {name: "GitHub Actions", deviconName: "githubactions"},
                {name: "Cloudflare"},
            ]
        }
    ],
	socialLinks: [
		{ name: "GitHub", url: "https://github.com/doggopwn" },
		{ name: "LinkedIn", url: "https://www.linkedin.com/in/oliver-nov%C3%A1k-08b354310/" }
	],
	projects: [{
		heading: "Cryptopals solutions",
		description: "Everyone knows 'how' basic encryption should work - but could you actually crack it yourself?\n\nSolutions to the challenges in pure C.",
		githubRepo: "olda28/cryptopals-c",
		technologies: ["c"]
	}]
}
export default data;
