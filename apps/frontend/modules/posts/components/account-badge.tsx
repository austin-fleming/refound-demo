import type { Account } from "@modules/api/account";
import NextImage from "next/image";

const colorClassTable: Record<Account["status"], string> = {
	VERIFIED: "bg-trustLevel-verified-bg text-trustLevel-verified-fg",
	TRUSTED: "bg-trustLevel-trusted-bg text-trustLevel-trusted-fg",
	NONE: "bg-trustLevel-none-bg text-trustLevel-none-fg",
};

export const AccountBadge = ({
	avatarUrl,
	username,
	status,
}: {
	avatarUrl: Account["avatarUrl"];
	username: Account["username"];
	status: Account["status"];
}) => (
	<div
		className={`${colorClassTable[status]} text-sm leading-none flex flex-row items-center rounded-[6px] p-[0.2em]`}
	>
		<figure className="relative h-[1.4em] w-[1.4em] rounded-[4px] overflow-hidden">
			<NextImage
				src={avatarUrl}
				alt={username}
				width={100}
				height={100}
				layout="fill"
				objectFit="cover"
				objectPosition="center"
			/>
		</figure>
		<div className="px-[1em]">
			@{username} <span className="capitalize opacity-60">• {status.toLowerCase()}</span>
		</div>
	</div>
);
