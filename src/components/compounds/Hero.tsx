import staticData from "../../assets/staticData.ts";
import SvgDevicon from "../atoms/SvgDevicon.tsx";
import ChipRow from "../molecules/ChipRow.tsx";

const Hero = () => {
    /*const [displayText, setDisplayText] = useState("");
    const [hideCursor, setHideCursor] = useState(false);
    const finalText = "Oliver Novák"

    useEffect(() => {
        let i = 0;
        const int = setInterval(() => {
            if (i <= finalText.length){
                setDisplayText(finalText.slice(0, i))
                i++;
            } else {
                clearInterval(int);
                setHideCursor(true)
            }
        }, 100)

        return () => {
            clearInterval(int)
        }
    }, [finalText])*/

    return (
        <div className="flex h-screen min-h-full flex-col bg-(image:--gradient-default) font-worksans text-main transition-all duration-500">
            <div id="grid" className="bg-[url('assets/grid.svg')] bg-size-[60px] z-0 fixed inset-0 pointer-events-none"/>
            <main id="hero" className="relative z-10 flex flex-grow-2 items-center px-8 py-16 md:px-16 md:py-24">
                <div className="mx-auto flex w-full max-w-6xl flex-col items-center gap-12 md:flex-row">
                    {/* left */}
                    <div id="hero-left" className="flex flex-[1_0_40%] flex-col gap-6">
                        <p className="text-sm leading-none font-medium tracking-[0.2em] text-hello uppercase md:text-lg">
                            Hello, I'm
                        </p>
                        <h1 className="overflow-y-visible bg-linear-to-r bg-(image:--gradient-name) bg-clip-text pb-0.5 text-6xl leading-none font-medium text-transparent md:text-7xl lg:text-8xl">
                            Oliver Novák
                        </h1>
                        <p className="text-base leading-none font-normal text-subtitle md:text-lg">
                            full-stack developer&nbsp;&nbsp;|&nbsp;&nbsp;programmer
                        </p>

                            <div className="item-center mt-2 flex flex-wrap gap-3">
                                <button className="cursor-pointer rounded-lg bg-linear-to-br from-[rgb(91,33,182)] to-[rgb(124,58,237)] px-5 py-2.5 text-sm font-semibold tracking-wide text-white shadow-button transition-all duration-200 hover:-translate-y-px hover:from-[rgb(76,29,149)] hover:to-[rgb(109,40,217)] hover:shadow-button-hover">
                                    Resume
                                </button>
                                <button className="cursor-pointer rounded-lg border border-indigo-500/25 bg-transparent px-5 py-2.5 text-sm font-semibold tracking-wide text-slate-400 transition-all duration-200 hover:-translate-y-px hover:border-indigo-300/50 hover:bg-indigo-500/10 hover:text-[rgb(55,48,163)] hover:text-indigo-300">
                                    My Projects
                                </button>
                            </div>
                        </div>
                        {/* right */}
                        <div id="hero-right" className="flex flex-1/2 flex-col gap-4 max-xs:w-full xs:max-sm:w-4/5 sm:max-md:w-3/5">
                            <div id="stack" className="flex flex-col gap-5 rounded-xl border border-card-border bg-slate-900/90 p-6 shadow-spotify backdrop-blur-md">
                                {staticData.stackChipRows.map((chipRowData) => {
                                    return <ChipRow key={chipRowData.label} iconSizePx={18} {...chipRowData}></ChipRow>
                                })}
                            </div>
                            <div id="spotify" className="flex items-center gap-3 rounded-xl border border-card-border bg-slate-900/60 px-5 py-3.5 shadow-spotify backdrop-blur-md max-xs:gap-4">
                                <div className="flex h-4.5 shrink-0 items-end gap-0.75">
                                    {["bar1", "bar2", "bar3", "bar4"].map((key) => (
                                        <span key={key} className={`${key} inline-block w-0.75 rounded-sm bg-spotify`} />
                                    ))}
                                </div>
                                <SvgDevicon name="spotify" height={18} breakpointCSS="max-2xs:hidden" />
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
                    </div>
                </div>
            </main>
        </div>
    )
}
export default Hero;