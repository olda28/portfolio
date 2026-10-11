import { render, within } from "@testing-library/react";
import { beforeAll, expect, it } from "vitest";
import staticData from "../../assets/staticData.ts";
import type { ChipRowData } from "../molecules/ChipRow.tsx";
import Hero from "./Hero.tsx";

let hero: HTMLElement;

let stackData: ChipRowData[];
let stackLabels: string[];
let chipTexts: string[];
let allStackTexts: string[];

beforeAll(() => {
	const mockFetch = vi.fn();
	mockFetch.mockResolvedValue({ status: 204 })
	global.fetch = mockFetch;

	const rendered = render(<Hero/>, {
										 onCaughtError: () => {
										 }
									 });
	hero = rendered.container;

	stackData = staticData.stackChipRows

	stackLabels = stackData.map(m => m.label || null).filter(m => m !== null)
	chipTexts = stackData.flatMap(m => m.chips.map(c => c.name))
	allStackTexts = stackLabels.concat(chipTexts);
})

describe("#stack", () => {
	let stack: HTMLElement | null;
	beforeAll(() => {
		stack = hero.querySelector<HTMLElement>("#stack");
	})

	it("should render chips from staticData", () => {
		expect(stack, "#stack is not rendered within Hero component").not.toBeNull()

		for (const stackText of allStackTexts) {
			const stackTextEl = within(stack!).queryByText(stackText);
			expect(stackTextEl, `'${stackText}' text`).not.toBeNull()
		}
	})
	it("should render SVGs for each chip", () => {
		expect(stack, "#stack not rendered").not.toBeNull()

		for (const chipText of chipTexts) {
			const found = within(stack!).queryByText(chipText)
			if (!found) continue;
			const svg = found.firstChild;
			expect(svg, `${chipText} child missing`).not.toBeNull()
			expect(svg, `"${chipText}" chip missing`).toBeInstanceOf(SVGSVGElement);
		}
	})
})
