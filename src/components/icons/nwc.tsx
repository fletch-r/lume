export function NwcIcon(props: JSX.IntrinsicElements["svg"]) {
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
				d="M13 4H9.222M13 4a4 4 0 010 8H9.222c-.206 0-.31 0-.396-.008a2 2 0 01-1.818-1.818C7 10.087 7 9.984 7 9.778V6.222c0-.206 0-.31.008-.396A2 2 0 019 4m4 0V2M9.222 4H9m.222 0H9m1.2 16H15a4 4 0 100-8h-4.8c-1.12 0-1.68 0-2.108.218a2 2 0 00-.874.874C7 13.52 7 14.08 7 15.2v1.6c0 1.12 0 1.68.218 2.108a2 2 0 00.874.874C8.52 20 9.08 20 10.2 20zm0 0H9M7 4v16M7 4H5m2 0h2M5 20h2m2 2v-2M9 2v2m4 18v-2m-6 0h2"
			/>
		</svg>
	);
}
