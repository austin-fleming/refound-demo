import type { Nullable } from "./monads";

export const unixTimestamp = {
	fromDate: (date: Date): string => {
		return `${Math.floor(date.getTime() / 1000)}`;
	},
	toDate: (timestamp: string): Nullable<Date> => {
		console.log({ timestamp });
		const timestampNumber = Number(timestamp);
		console.log({ timestampNumber });
		if (Number.isNaN(timestampNumber)) return;

		return new Date(timestampNumber * 1000);
	},
};
