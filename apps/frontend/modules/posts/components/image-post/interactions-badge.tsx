import { DownArrowIcon, UpArrowIcon } from "@components/icons/menu-icons";
import type { PostInteractionList } from "@modules/refound/models/interactions.model";

export const InteractionsBadge = ({
	interactionList,
}: {
	interactionList: PostInteractionList;
}) => {
	return (
		<div className="flex flex-row gap-2 text-sm">
			<div className="flex flex-row items-center">
				<UpArrowIcon filled className="w-[1em] h-[1em]" />
				<span className="font-mono">{interactionList.UpVote}</span>
			</div>
			<div className="flex flex-row items-center">
				<DownArrowIcon filled className="w-[1em] h-[1em]" />
				<span className="font-mono">{interactionList.DownVote}</span>
			</div>
		</div>
	);
};
