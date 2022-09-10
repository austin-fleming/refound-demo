export const RatingBadge = ({
	score,
	label,
	count,
}: {
	score: string;
	label: string;
	count?: number;
}) => (
	<div className="text-xs leading-none p-[0.2em] text-black bg-stone-200 flex flex-row gap-[1em] pr-[1em] rounded-[0.5em] justify-start items-center">
		<div className="bg-black text-white py-[0.5em] px-[1em] rounded-[0.3em]">{score}</div>
		<div className="whitespace-nowrap">
			<span className="text-[1.2em]">{label}</span>
			{count && <span className="opacity-60"> ({count})</span>}
		</div>
	</div>
);
