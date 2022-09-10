import type { Photograph } from "@modules/api/photographs";
import NextImage from "next/image";
import NextLink from "next/link";

export const PhotographCard = ({ photoData }: { photoData: Photograph }) => {
	// TODO: Account Badge
	return (
		<NextLink href={photoData.slug}>
			<a>
				<article>
					<h1 className="font-bold">{photoData.title}</h1>
					<figure>
						<NextImage
							src={photoData.source}
							alt={photoData.description || "placeholder alt"}
							layout="responsive"
							width={photoData.width}
							height={photoData.height}
						/>
						{photoData.description && <figcaption>{photoData.description}</figcaption>}
					</figure>
				</article>
			</a>
		</NextLink>
	);
};
