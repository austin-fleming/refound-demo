export const TabButton = ({
	tabName,
	isActive,
	onClick,
}: {
	tabName: string;
	isActive: boolean;
	onClick: () => void;
}) => {
	return (
		<button
			className={`text-sm border-b-2 border-solid py-[0.5em] ${
				isActive ? "border-black" : "border-transparent"
			}`}
			type="button"
			onClick={onClick}
		>
			{tabName}
		</button>
	);
};
