import type { PostRanking, RankingDetails } from "@modules/mocks/common";

export const RankingBadge = ({
	label,
	rankingDetails,
}: {
	label: string;
	rankingDetails: RankingDetails;
}) => (
	<div className="text-[12px] leading-none p-[0.2em] text-black bg-stone-200 flex flex-row gap-[1em] pr-[1em] rounded-[0.3em] justify-start items-center">
		<div className="bg-black text-[10px] text-white py-[0.5em] px-[1em] rounded-[0.3em]">{`${
			rankingDetails.ratio * 100
		}%`}</div>
		<div className="whitespace-nowrap">
			<span className="text-[12px] capitalize leading-none">{label}</span>
			{rankingDetails.votes && (
				<span className="opacity-60 text-[10px]"> ({rankingDetails.votes})</span>
			)}
		</div>
	</div>
);

export const RankingBadges = ({ postRankings }: { postRankings: PostRanking }) => (
	<div className="flex flex-row text-[12px] gap-[0.5em]">
		<RankingBadge label="users" rankingDetails={postRankings.community} />
		<RankingBadge label="stakers" rankingDetails={postRankings.stakers} />
	</div>
);
