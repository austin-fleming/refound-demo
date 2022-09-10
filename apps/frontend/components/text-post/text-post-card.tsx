import type { TextPost } from "@modules/api/text-post";
import NextLink from "next/link";

export const TextPostCard = ({ data }: { data: TextPost }) => {
	return (
		<NextLink href={data.slug}>
			<a>
				<article>
					<code>{JSON.stringify(data, null, "/t")}</code>
				</article>
			</a>
		</NextLink>
	);
};
