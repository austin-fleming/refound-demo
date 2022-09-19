import { isString } from "@utils/data-helpers/is-string";

export const CardTimestamp = ({ date }: { date: Date | string }) => {
	const processedDate = isString(date) ? new Date(date) : date;
	return (
		<time className="text-xs" dateTime={processedDate.toISOString()}>
			{processedDate.toDateString()}
		</time>
	);
};
