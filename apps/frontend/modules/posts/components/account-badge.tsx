import type { Account } from "@modules/mocks/account";
import NextImage from "next/image";

const colorClassTable: Record<Account["status"], string> = {
	VERIFIED: "bg-trustLevel-verified-bg text-trustLevel-verified-fg",
	TRUSTED: "bg-trustLevel-trusted-bg text-trustLevel-trusted-fg",
	NONE: "bg-trustLevel-none-bg text-trustLevel-none-fg",
};

export const AccountBadge = ({ creator }: { creator: Account }) => (
	<div
		className={`${
			colorClassTable[creator.status]
		} text-sm leading-none flex flex-row items-center rounded-[6px] p-[0.2em]`}
	>
		<figure className="relative h-[1.4em] w-[1.4em] rounded-[4px] overflow-hidden">
			<NextImage
				src={creator.avatarUrl}
				alt={creator.username}
				width={100}
				height={100}
				layout="fill"
				objectFit="cover"
				objectPosition="center"
			/>
		</figure>
		<div className="px-[1em]">
			@{creator.username}{" "}
			<span className="capitalize opacity-60">• {creator.status.toLowerCase()}</span>
		</div>
	</div>
);
