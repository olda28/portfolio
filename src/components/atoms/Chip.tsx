import SvgDevicon from "./SvgDevicon.tsx";
import type {ReactElement} from "react";

export interface ChipProps {
    name: string;
    deviconName?: string;  // Devicons are fetched dynamically, optional string if the repo name is different from "name"
    heightPx?: number;
}

export default function Chip({name, deviconName, heightPx}: ChipProps): ReactElement {
    if (!deviconName) deviconName = name.toLowerCase();

    return (
            <span style={{lineHeight: heightPx ? `${heightPx}px`: "normal"}} className={`flex gap-1.5 rounded border border-indigo-500/15 bg-indigo-500/10 px-3 py-1.5 text-xs leading-[revert] text-slate-400`}>
                <SvgDevicon name={deviconName} height={heightPx}/>
                {name}
            </span>
    )
}