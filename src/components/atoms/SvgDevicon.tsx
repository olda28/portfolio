import type {ComponentProps, FunctionComponent} from "react";

interface SvgDeviconProps {
    name: string;
    height: number;
}

type SvgIcon = FunctionComponent<ComponentProps<"svg">>;


const iconMap = import.meta.glob("@/icons/*.svg", {
    eager: true,
    query: "?react",
    import: "default"
})

function notFound(name: string){
    console.error(`Icon ${name} not found`)
    return <div/>;
}

export default function SvgDevicon({name, height}: SvgDeviconProps) {
    const key = Object.keys(iconMap).find(k => k.includes(name));
    if (!key) return notFound(name);

    const Svg = iconMap[key] as SvgIcon
    if (!Svg || typeof Svg !== "function") return notFound(name);

    return <Svg className="overflow-visible" height={height} />
}
