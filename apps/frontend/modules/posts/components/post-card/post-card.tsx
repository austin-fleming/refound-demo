import type { ReactNode } from "react";
import NextLink from "next/link";

export const PostCard = ({ children, slug }: { children: ReactNode; slug: string }) => (
	<NextLink href={slug}>
		<a className="block">
			<article className="flex flex-col w-full items-start text-base gap-[0.5em]">
				{children}
			</article>
		</a>
	</NextLink>
);
