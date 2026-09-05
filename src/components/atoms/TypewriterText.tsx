import {type Dispatch, type JSX, type SetStateAction, useEffect, useState} from "react";

interface TypewriterTextProps {
    children: string;
    delayMs: number;
    withCursor?: boolean;
    waitAfterFinishMs?: number;
    setFinished?: Dispatch<SetStateAction<boolean>>;
    waitFor?: boolean;
}

export const TypewriterText = ({
                                   children,
                                   delayMs,
                                   withCursor = false,
                                   waitAfterFinishMs = 0,
                                   setFinished,
                                   waitFor = true
                               }: TypewriterTextProps): JSX.Element | string => {
    const fullText = children;
    const [displayText, setDisplayText] = useState("")
    const [showCursor, setShowCursor] = useState(withCursor);

    useEffect(() => {
        if (!waitFor) return;

        let i = 0;

        const interval = setInterval(() => {
            if (i <= fullText.length) {
                setDisplayText(fullText.slice(0, i));
                i++;
            } else {
                clearInterval(interval);
                setTimeout(() => {
                    setShowCursor(false);
                    setFinished && setFinished(true)
                }, waitAfterFinishMs)
            }
        }, delayMs)

        return () => {
            clearInterval(interval);
        }
    }, [waitFor])

    return (<>
        {displayText}
        {(showCursor && waitFor) && <span className="cursor-pulse">|</span>}
    </>)
}