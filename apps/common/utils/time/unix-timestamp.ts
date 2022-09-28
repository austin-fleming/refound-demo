import type { Result } from "@utils/monads";
import { result } from "@utils/monads";
import { isNumber } from "@utils/validation";
import { isDate } from "@utils/validation/is-date";

export const unixTimestamp = {
	fromDate: (date: Date): string => {
		return `${Math.floor(date.getTime() / 1000)}`;
	},
	toDate: (timestamp: string | number): Result<Date> => {
		const timestampNumber = Number(timestamp);
		if (!isNumber(timestampNumber)) return result.fail(new Error("NaN"));

		const date = new Date(timestampNumber * 1000);

		if (!isDate(date)) return result.fail(new Error("Not a date"));

		return result.ok(date);
	},
};
