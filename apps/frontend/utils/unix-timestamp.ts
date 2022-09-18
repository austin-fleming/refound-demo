import type { Result } from "./monads";
import { Nullable, result } from "./monads";

export const unixTimestamp = {
	fromDate: (date: Date): string => {
		return `${Math.floor(date.getTime() / 1000)}`;
	},
	toDate: (timestamp: string | number): Result<Date> => {
		const timestampNumber = Number(timestamp);
		if (Number.isNaN(timestampNumber)) return result.fail(new Error("NaN"));

		return result.ok(new Date(timestampNumber * 1000));
	},
};
