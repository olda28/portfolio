import SvgDevicon from "../atoms/SvgDevicon.tsx";

export default function SpotifyBanner() {
    return (
        <div
            // flex
            className="hidden items-center gap-3 rounded-xl border border-card-border bg-slate-900/60 px-5 py-3.5 shadow-spotify backdrop-blur-md max-xs:gap-4">
            <div className="flex h-4.5 shrink-0 items-end gap-0.75">
                {["bar1", "bar2", "bar3", "bar4"].map((key) => (
                    <span key={key} className={`${key} inline-block w-0.75 rounded-sm bg-spotify`}/>
                ))}
            </div>
            <SvgDevicon name="spotify" height={18} breakpointCSS="max-2xs:hidden"/>
            <div className="flex flex-col">
                <span className="text-xs font-normal tracking-wide text-gray-400 uppercase">
                    what i'm listening to
                </span>
                <span className="truncate text-sm font-semibold text-gray-600 dark:text-gray-200">
                    Like a stone
                    <span className="font-normal">
                        {" — "}Audioslave
                    </span>
                </span>
            </div>
        </div>
    )
}