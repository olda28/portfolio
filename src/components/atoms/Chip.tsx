import SvgDevicon from "./SvgDevicon.tsx";

interface ChipProps {
    name: string;
    deviconName?: string;
    height: number;
}

export default function Chip({name, deviconName, height}: ChipProps) {
    if (!deviconName) deviconName = name.toLowerCase();

    return (
            <span className="flex gap-1.5 px-3 py-1.5 text-xs text-slate-400 rounded border border-indigo-500/15 bg-indigo-500/10">
                <SvgDevicon name={deviconName} height={height}/>
                {name}
            </span>
    )
}