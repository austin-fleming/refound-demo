import type { Result } from "@utils/monads";
import { isNothing, result } from "@utils/monads";
import { LicenseType } from "../models/license.model";

const codeToValueTable: Record<number, LicenseType> = {
	0: LicenseType.Outright,
	1: LicenseType.WebLicense,
	2: LicenseType.PrintLicense,
	3: LicenseType.SingleUse,
};
const valueToCodeTable: Record<LicenseType, number> = {
	[LicenseType.Outright]: 0,
	[LicenseType.WebLicense]: 1,
	[LicenseType.PrintLicense]: 2,
	[LicenseType.SingleUse]: 3,
};

const valueToCode = (value: LicenseType): Result<number> => {
	const outcome = valueToCodeTable[value];
	console.log({ value });

	if (isNothing(outcome)) return result.fail(new Error(`Unknown interaction value: ${value}`));

	return result.ok(outcome);
};

export const licenseParser = {
	valueToCode,
};
