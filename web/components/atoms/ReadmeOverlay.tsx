import { useEffect, useState } from "react";
import SvgDevicon from "./SvgDevicon.tsx";

const IFRAME_STYLE = `a { text-decoration: none; color: #4338ca; border-bottom: 1px #4338ca solid; }
					  a:has(> img) { border: none; }`

const IFRAME_SCRIPT = (repo: string) => `document.querySelectorAll('a').forEach(el => {
			el.href = el.href.replace('${window.location.href}', 'https://github.com/${repo}/blob/master/');
			el.target = '_blank';
		})
			document.querySelectorAll("img").forEach(el => {
			el.src = el.src.replace('${window.location.href}', 'https://raw.githubusercontent.com/${repo}/master/');
		})`

// noinspection CssMissingComma
export const HtmlDocWith = (content: string, style = "", scriptOnLoad = "") => `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <link rel="preconnect" href="https://fonts.googleapis.com">
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
	<link href="https://fonts.googleapis.com/css2?family=Mona+Sans:ital,wght@0,200..900;1,200..900&display=swap" rel="stylesheet">
	<script>
	window.onload = () => {
		${scriptOnLoad}
		document.querySelectorAll("a.anchor").forEach(el => el.remove());

	}
</script>
  </head>
  <style>
  ${style}
  body {
  background: transparent;
  color: #cbd5e1;
  }
</style>
  <body style="font-family: 'Mona Sans', sans-serif">
  ${content}
  </body>
</html>`

interface ReadmeOverlay {
	repo: string;
	live?: string;
	visible: boolean;
	onClose: () => void;
}

const ReadmeOverlay = ({ repo, live, visible, onClose }: ReadmeOverlay) => {
	const [data, setData] = useState(null)

	useEffect(() => {
		if (data || !visible) return;
		const fetchData = async () => {
			const res = await fetch(`https://api.github.com/repos/${repo}/contents/README.md`, { headers: { Accept: 'application/vnd.github.html+json' } })
			if (!res.ok) return;
			const text = await res.text();
			const html = HtmlDocWith(text, IFRAME_STYLE, IFRAME_SCRIPT(repo));
			setData(html);
		}
		// noinspection JSIgnoredPromiseFromCall
		fetchData();
	}, [visible]);

	return (
		<div className={`fixed z-50 backdrop-blur-sm inset-0 my-auto flex items-center justify-center transition-all ease-out duration-300
	${visible ? "w-full h-full opacity-100" : "w-0 h-0 opacity-0"}`}
			 onClick={(e) => e.target === e.currentTarget && onClose()}>
			<div
				className="flex h-[90%] w-[90%] max-w-3xl flex-col rounded-2xl border border-indigo-400/20 bg-slate-950/85 px-6 py-6 overflow-clip relative">
				<div
					className="align-center flex-wrap gap-x-13 gap-y-4 flex justify-between border-b border-b-indigo-700 pb-4 mb-2">
					<p className="grow-4 cursor-pointer text-lg font-semibold text-indigo-500" onClick={onClose}>
						← Back
					</p>
					<div className="grow flex gap-6 justify-around">
						{live && <a href={live} target="_blank">
							<div className="flex items-center gap-3 font-medium text-indigo-500">
								<SvgDevicon name="web" height={25}/>
								View live
							</div>
						</a>}
						<a href={`https://github.com/${repo}`} target="_blank">
							<div className="flex items-center gap-3 font-medium text-indigo-500">
								<SvgDevicon name="github-dark" height={25}/>
								View on GitHub
							</div>
						</a>
					</div>
				</div>
				{data ? <iframe className="h-full w-full mb-8" srcDoc={data}
								sandbox="allow-scripts allow-popups allow-popups-to-escape-sandbox"/> :
					<p className="p-5 font-semibold text-lg text-white">Loading...</p>}
				<div className="absolute bottom-5 left-1/2">
					<p className="text-sm font-medium text-slate-600 -translate-x-1/2">README.md</p>
				</div>
			</div>
		</div>
	)
}

export default ReadmeOverlay;
