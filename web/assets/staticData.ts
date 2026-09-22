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
		{ name: "GitHub", url: "https://github.com/doggopwn"}
	]
}
export default data;
