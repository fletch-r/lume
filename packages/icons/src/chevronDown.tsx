import { SVGProps } from "react";

export function ChevronDownIcon(
	props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>,
) {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="24"
			height="24"
			fill="none"
			viewBox="0 0 24 24"
			{...props}
		>
			<path
				stroke="currentColor"
				strokeLinecap="round"
				strokeLinejoin="round"
				strokeWidth="2"
				d="M8 10.14a20.36 20.36 0 003.702 3.893c.175.141.42.141.596 0A20.361 20.361 0 0016 10.14"
			/>
		</svg>
	);
}
