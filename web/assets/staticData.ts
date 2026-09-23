import type {ChipRowData} from "../components/molecules/ChipRow.tsx";

type SocialLink = { name: string, deviconName?: string, url: string }

interface StaticData {
    stackChipRows: ChipRowData[];
	socialLinks: SocialLink[];
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
	]
}
export default data;
