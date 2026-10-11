import type { ReactElement } from "react";
import Chip, { type ChipProps } from "../atoms/Chip.tsx";

export interface ChipRowData {
	label?: string;
	chips: Array<ChipProps>
}

type ChipRowProps = ChipRowData & {
	iconSizePx: number;
}

export default function ChipRow({ label, iconSizePx, chips }: ChipRowProps): ReactElement {
	return (
		<div className="flex items-start gap-1 max-xs:flex-col max-xs:gap-2.5">
			{label && (<span
				className="mr-2 w-1/4 pt-1 text-xs font-normal tracking-widest text-slate-400 uppercase max-sm:w-[30%]">{label}</span>)}
			<div className="flex w-3/4 flex-wrap justify-start gap-1 max-xs:w-full">
				{chips.map(props => {
					if (!props.deviconName) props.deviconName = props.name.toLowerCase();
					props.heightPx = iconSizePx;
					return <Chip key={props.name} {...props} />
				})}
			</div>
		</div>
	)
}
