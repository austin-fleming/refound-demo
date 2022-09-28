import { isString } from "./is-string";

export const stringIsNumber = (value: string) => {
	if (!isString(value)) return false;

	return !Number.isNaN(value) && !Number.isNaN(Number.parseFloat(value));
};
