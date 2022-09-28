import type { Result } from "@utils/monads";
import { result } from "@utils/monads";
import { isNumber } from "@utils/validation";

export const stringToNumber = (value: string | number): Result<number> => {
	if (isNumber(value)) return result.ok(value);

	const maybeNumber = Number(value);

	return isNumber(maybeNumber)
		? result.ok(maybeNumber)
		: result.fail(new TypeError(`string "${value}" cannot be parsed to a number.`));
};
