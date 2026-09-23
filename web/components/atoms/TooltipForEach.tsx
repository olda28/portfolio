import * as React from "react";

type TooltipElement = React.ReactElement<React.HTMLAttributes<HTMLElement>>
interface TooltipForEachProps {
	children: React.ReactNode;
}

export default function TooltipForEach({children}: TooltipForEachProps) {
	let tooltip: HTMLElement;
	function showTooltip(e: React.MouseEvent) {
		tooltip ??= document.getElementById("tooltip");
		if (!tooltip) return console.error("[TooltipForEach] Could not locate #tooltip element");

		const target = e.currentTarget as HTMLElement;
		const rect = target.getBoundingClientRect();

		tooltip.textContent = target.dataset.tooltip;

		tooltip.style.left = `${rect.right - rect.width/2}px`
		tooltip.style.top = `${rect.bottom + rect.height + 5}px`
		tooltip.style.display = "block";
		tooltip.classList.add("slidein-fast");
	}

	function hideTooltip(){
		tooltip ??= document.getElementById("tooltip");
		if (!tooltip) return console.error("[TooltipForEach] Could not locate #tooltip element");

		tooltip.style.display = "none";
	}


	return React.Children.map(children, child => {
		if (!React.isValidElement(child)) return child;
		if (typeof child.props === "object" && !("data-tooltip" in child.props)) {
			console.error(`Child of TooltipForEach did not contain "data-tooltip" attribute (<${child.type}>) (idx: ${child.key || "none"}`);
			return child;
		}

		return React.cloneElement(child as TooltipElement, {
			onMouseEnter: showTooltip,
			onMouseLeave: hideTooltip
		})
	})
}
