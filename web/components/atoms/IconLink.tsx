import type {IconLinkData} from "../../assets/staticData.ts";
import SvgDevicon from "./SvgDevicon.tsx";

interface SocialLinkProps {
	link: IconLinkData;
	iconHeightPx: number;
}

const IconLink = ({link, iconHeightPx}: SocialLinkProps) => {
	return (
		<a href={link.url} data-tooltip={link.name} target="_blank">
			<SvgDevicon name={link.deviconName || link.name.toLowerCase()} height={iconHeightPx} />
		</a>
	)
}
export default IconLink;
