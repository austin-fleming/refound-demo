import type { Pool } from "@modules/api/pools";
import { AccountBadge } from "./account-badge";
import NextImage from "next/image";
import NextLink from "next/link";
import { RatingBadge } from "./rating-badge";

export const PoolCard = ({ poolData }: { poolData: Pool }) => (
	<NextLink href={poolData.slug}>
		<a>
			<article className="flex flex-col items-start text-base gap-[1em]">
				<div className="flex flex-row items-center justify-between w-full">
					<AccountBadge
						avatarUrl={poolData.creator.avatarUrl}
						username={poolData.creator.username}
						status={poolData.creator.status}
					/>

					<span>{poolData.creationDate.toDateString()}</span>
				</div>

				<span>{poolData.category}</span>
				<h1 className="text-xl font-bold">{poolData.title}</h1>
				<p className="text-sm">{poolData.description}</p>

				<figure className="relative w-full pb-[60%] rounded-[0.3em] overflow-hidden">
					{/* TODO: images should have dimension data. */}
					<NextImage
						src={poolData.coverImage}
						alt={poolData.title}
						layout="fill"
						objectFit="cover"
						objectPosition="center"
					/>
				</figure>
				<div className="flex flex-row justify-between w-full">
					<div className="flex flex-row">
						<RatingBadge
							score={`${poolData.communityRanking * 100}%`}
							label="Users"
							count={poolData.communityVotes}
						/>
						<RatingBadge score={`${poolData.stakerRanking * 100}%`} label="Stakers" />
					</div>

					<div className="flex flex-row justify-end w-full">
						<button>share</button>
						<button>share</button>
					</div>
				</div>
			</article>
		</a>
	</NextLink>
);
