import * as React from "react";

export default function Tooltip() {
	const tooltipRef = React.useRef(null);

	React.useEffect(() => {
		const tooltip = tooltipRef.current;
		if (!tooltip) return console.error("Tooltip was not mounted.");

		function showTooltip(e: MouseEvent) {
			const target = e.currentTarget as HTMLElement;
			const rect = target.getBoundingClientRect();

			tooltip.textContent = target.dataset.tooltip;

			tooltip.style.left = `${rect.right - rect.width/2}px`
			tooltip.style.top = `${rect.bottom + rect.height + 5}px`
			tooltip.style.display = "block";
			tooltip.classList.add("slidein-fast");
		}

		function hideTooltip(){
			tooltip.style.display = "none";
		}

		const tooltipFor = document.querySelectorAll("[data-tooltip]");
		for (let i = 0; i < tooltipFor.length; i++){
			const child = tooltipFor.item(i);
			if (!(child instanceof HTMLElement)) continue;
			if (!child.dataset.tooltip) continue;

			child.addEventListener("mouseenter", showTooltip);
			child.addEventListener("mouseleave", hideTooltip);
		}
	}, []);

	return <div ref={tooltipRef} className="uparrow fixed hidden h-auto w-fit -translate-1/2 rounded-lg border border-violet-500/25 bg-slate-900/60 px-2 py-2 font-worksans text-sm font-medium text-slate-300 shadow-sm shadow-violet-500/20 drop-shadow-md">
		<p></p>
	</div>
}
