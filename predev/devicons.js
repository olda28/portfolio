import { readFileSync, writeFileSync } from "fs";
import path from 'path';
import { fileURLToPath } from 'url';

const BASE_URL = "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons"

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const iconNameList = readFileSync(__dirname + "/devicons.list").toString().split(",");

async function downloadIcons(){
    for (const icon of iconNameList) {
        const iconURL = `${BASE_URL}/${icon}/${icon}-original.svg`;
        const writePath = `./src/assets/icons/${icon}.svg`;

        const res = await fetch(iconURL);
        if (res.ok){
            const svg = Buffer.from(await res.arrayBuffer());
            writeFileSync(writePath, svg);
        }
    }
}
downloadIcons();