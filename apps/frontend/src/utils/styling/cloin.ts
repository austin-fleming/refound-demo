import type { StrictFalseable } from "@repo/common/utils/helper-types";

export function cloin(...cssClasses: Array<StrictFalseable<string>>): string {
	return cssClasses.filter((maybeClass) => !!maybeClass).join(" ");
}
