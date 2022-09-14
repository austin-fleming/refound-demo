const BookmarkButton = ({
	filled = false,
	className = "",
}: {
	filled?: boolean;
	className?: string;
}) => {
	return filled ? (
		<svg className={className} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
			<path
				d="M6.19 21.854a.75.75 0 0 1-1.188-.61V6.25a3.25 3.25 0 0 1 3.25-3.25h7.499A3.25 3.25 0 0 1 19 6.249v14.996a.75.75 0 0 1-1.188.609l-5.811-4.181-5.812 4.18Z"
				fill="currentColor"
			/>
		</svg>
	) : (
		<svg className={className} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
			<path
				d="M6.19 21.854a.75.75 0 0 1-1.188-.61V6.25a3.25 3.25 0 0 1 3.25-3.25h7.499A3.25 3.25 0 0 1 19 6.249v14.996a.75.75 0 0 1-1.188.609l-5.811-4.181-5.812 4.18ZM17.5 6.249a1.75 1.75 0 0 0-1.75-1.75H8.253a1.75 1.75 0 0 0-1.75 1.75v13.532l5.062-3.64a.75.75 0 0 1 .876 0l5.06 3.64V6.25Z"
				fill="currentColor"
			/>
		</svg>
	);
};

const ShareButton = ({
	filled = false,
	className = "",
}: {
	filled?: boolean;
	className: string;
}) => {
	return filled ? (
		<svg className={className} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
			<path
				d="M17 3.002a2.998 2.998 0 1 1-2.148 5.09l-5.457 3.12a3.002 3.002 0 0 1 0 1.577l5.458 3.119a2.998 2.998 0 1 1-.746 1.304l-5.457-3.12a2.998 2.998 0 1 1 0-4.184l5.457-3.12A2.998 2.998 0 0 1 17 3.002Z"
				fill="currentColor"
			/>
		</svg>
	) : (
		<svg className={className} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
			<path
				d="M17 2.498a3.502 3.502 0 1 1-2.597 5.851l-4.558 2.604a3.5 3.5 0 0 1 0 2.093l4.557 2.606a3.502 3.502 0 1 1-.745 1.302L9.1 14.347a3.502 3.502 0 1 1 0-4.698l4.557-2.604A3.502 3.502 0 0 1 17 2.498Zm0 13.5a2.002 2.002 0 1 0 0 4.004 2.002 2.002 0 0 0 0-4.004Zm-10.498-6a2.002 2.002 0 1 0 0 4.004 2.002 2.002 0 0 0 0-4.004Zm10.498-6a2.002 2.002 0 1 0 0 4.004 2.002 2.002 0 0 0 0-4.004Z"
				fill="currentColor"
			/>
		</svg>
	);
};

export const ActionButtons = () => (
	<div className="flex flex-row gap-[0.5em] text-xl">
		<ShareButton className="w-[1em] h-[1em]" />
		<BookmarkButton className="w-[1em] h-[1em]" />
	</div>
);
