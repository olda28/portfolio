import {writeFileSync} from "fs";
import staticData from "../web/assets/staticData.ts";

const BASE_URL = "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons"

const iconNameList = staticData.stackChipRows.flatMap(row => row.chips.map(chip => chip.deviconName || chip.name.toLowerCase()));

const suffixList = ["original", "plain", "plain-wordmark"]

async function downloadIcons(){
    for (const icon of iconNameList) {

        const writePath = `./web/assets/icons/${icon}.svg`

        for (const suffix of suffixList) {
            const iconURL = `${BASE_URL}/${icon}/${icon}-${suffix}.svg`;

            process.stdout.write(`Downloading ${iconURL}... `);
            const res = await fetch(iconURL);
            if (res.ok) {
                console.log("ok");
                const svg = Buffer.from(await res.arrayBuffer());
                writeFileSync(writePath, svg);
                break;
            } else {
                console.log("FAIL")
            }
        }
    }
}
downloadIcons().catch(console.error);
