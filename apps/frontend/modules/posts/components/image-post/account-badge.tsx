import type { Profile } from "@modules/refound/models/profile.model";
import { cloin } from "@utils/cloin";

export const AccountBadge = ({ profile }: { profile: Profile }) => (
	<a
		href={`/u/${profile.username}`}
		className={cloin(
			"badge",
			profile.status === "NONE" && "badge-ghost",
			profile.status === "TRUSTED" && "badge-info",
			profile.status === "VERIFIED" && "badge-success",
		)}
	>
		<span>
			<span className="text-[0.8em]">@</span>
			{profile.username}
			{profile.status !== "NONE" ? `• ${profile.status.toLowerCase()}` : ""}
		</span>
	</a>
);
