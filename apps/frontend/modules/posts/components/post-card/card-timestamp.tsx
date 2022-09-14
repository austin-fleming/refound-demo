export const CardTimestamp = ({ date }: { date: Date }) => (
	<time className="text-xs" dateTime={date.toISOString()}>
		{date.toDateString()}
	</time>
);
