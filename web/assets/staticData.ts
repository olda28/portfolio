import type {ChipRowData} from "../components/molecules/ChipRow.tsx";


interface StaticData {
    stackChipRows: Array<ChipRowData>
}

const data: StaticData = {
    stackChipRows: [
        {
            label: "Frontend", chips: [
                {name: "React"},
                {name: "Tailwind", deviconName: "tailwindcss"},
                {name: "TypeScript"}
            ],
        }, {
            label: "Backend", chips: [
                {name: "Node.js", deviconName: "nodejs"},
                {name: "Express.js", deviconName: "express"},
                {name: "PostgreSQL"},
                {name: "Jest"},
                {name: "Rust"}
            ]
        }, {
            label: "Tools", chips: [
                {name: "Git"},
                {name: "GitHub Actions", deviconName: "githubactions"},
                {name: "Docker"},
                {name: "AWS", deviconName: "amazonwebservices"},
            ]
        }
    ]
}
export default data;
