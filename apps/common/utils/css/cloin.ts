import type { StrictFalseable } from "@utils/helper-types";

export const cloin = (...classes: Array<StrictFalseable<string>>): string =>
	classes.filter((maybeClass) => !!maybeClass).join(" ");
