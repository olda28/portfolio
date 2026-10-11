import {useEffect, useRef, useState} from "react";
import SvgDevicon from "./SvgDevicon.tsx";

const HtmlDocWith = (content: string) => `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <link rel="preconnect" href="https://fonts.googleapis.com">
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
	<link href="https://fonts.googleapis.com/css2?family=Mona+Sans:ital,wght@0,200..900;1,200..900&display=swap" rel="stylesheet">
  </head>
  <body style="font-family: 'Mona Sans', sans-serif">
  ${content}
  </body>
</html>`

interface ReadmeOverlay {
	repo: string;
	visible: boolean;
	onClose: () => void;
}
const ReadmeOverlay = ({repo, visible, onClose}: ReadmeOverlay) => {
	const [data, setData] = useState(null)
	const overlay = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (data) return;
		const fetchData = async () => {
			const res = await fetch(`https://api.github.com/repos/${repo}/contents/README.md`, { headers: { Accept: 'application/vnd.github.html+json' } })
			if (!res.ok) return;
			const text = await res.text();
			const nolinks = text.replaceAll(/<a .*?>.*?<\/a>/gm, "");
			const html = HtmlDocWith(nolinks);
			setData(html);
		}
		fetchData();
	}, []);

	return (
		<div ref={overlay} className={`fixed z-50 backdrop-blur-sm inset-0 my-auto flex items-center justify-center transition-all ease-out duration-300
	${visible ? "w-full h-full opacity-100" : "w-0 h-0 opacity-0"}`}>
			<div className={`bg-slate-300/80 rounded-2xl w-[90%] h-[90%] flex flex-col px-6 py-6`}>
				<div className="flex justify-between align-center border-b-indigo-900 border-b pb-4">
					<p className="text-indigo-900 font-semibold text-xl cursor-pointer" onClick={onClose}>
						← Back
					</p>
					<a href={`https://github.com/${repo}`}>
						<div className="flex items-center gap-3 text-indigo-900 font-medium">
							<SvgDevicon name="github-dark" height={30}/>
							View on GitHub
						</div>
					</a>
				</div>
				{ data ? <iframe className="h-full w-full" srcDoc={data} sandbox=""/>  : <p>Loading...</p> }
			</div>
		</div>
	)
}

export default ReadmeOverlay;
