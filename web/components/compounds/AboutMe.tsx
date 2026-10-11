import { HtmlDocWith } from "../atoms/ReadmeOverlay.tsx";

const iframeContent = HtmlDocWith(`<div id="file" class="md" data-path="README.md"><article class="markdown-body entry-content container-lg" itemprop="text"><div class="markdown-heading" dir="auto"><h2 class="heading-element" dir="auto">Hi there 👋</h2></div>
<p dir="auto">I'm a programmer with a special interest for low-end languages and computer hardware.</p>
<ul dir="auto">
<li>🔭 I’m currently working on <a href="https://github.com/olda28/cryptopals-c">cryptopals</a></li>
<li>📚 Also working through the <a href="https://nand2tetris.org" rel="nofollow">Nand2Tetris</a> project and writing my notes. Check it out, it's really interesting!</li>
</ul>
<p dir="auto">✨ Messages and work opportunities are always welcome. Feel free to send me a message or reach out via email or LinkedIn.</p>

</article></div>`, `a { text-decoration: none; color: darkgoldenrod; border-bottom: 1px darkgoldenrod solid; }`);

const AboutMe = () => {
	return (
		<div id="aboutme" className="px-8 py-16 font-worksans text-white md:px-16 md:pb-24 md:pt-2  max-w-200">
			<h1 className="mb-10 text-5xl font-medium max-md:text-center">About Me</h1>
			<div
				className="bg-slate-900/90 border border-card-border px-10 py-8 text-lg shadow-card font rounded-xl whitespace-pre-line text-[#cbd5e1]` h-90">
				<iframe scrolling={"no"} className="w-full h-full" srcDoc={iframeContent}
						sandbox="allow-scripts allow-popups allow-same-origin"/>
			</div>
		</div>
	);
}
export default AboutMe;
