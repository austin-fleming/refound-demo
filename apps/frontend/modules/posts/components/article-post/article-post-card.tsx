import type { ArticlePostAggregate } from "@modules/refound/models/post.aggregate";
import NextImage from "next/image";
import { trimText } from "@utils/trim-text";
import { AccountBadge } from "../image-post/account-badge";
import { InteractionsBadge } from "../image-post/interactions-badge";

export const ArticlePostCard = ({
	articlePost: { title, body, postId, coverImage, createdAt, creator, tags, interactions },
}: {
	articlePost: ArticlePostAggregate;
}) => {
	return (
		<article className="group">
			<div className="relative">
				{coverImage ? (
					<figure className="relative w-full pb-[80%] overflow-hidden rounded-md">
						<NextImage
							src={coverImage.imageSource}
							layout="fill"
							objectFit="cover"
							alt={title}
						/>
						<figcaption className="absolute top-0 bottom-0 left-0 right-0 flex flex-col justify-between transition-opacity duration-300 opacity-0 bg-gradient-to-b from-transparent to-primary/90 group-hover:opacity-100">
							<div className="w-full p-4">
								{tags.map((tag) => (
									<span
										key={tag}
										className="text-white inline-block text-xs bg-black rounded-full px-[0.8em] py-[0.2em] leading-none mr-[0.5em]"
									>
										{tag}
									</span>
								))}
							</div>
							<div className="translate-y-[100%] duration-150 group-hover:translate-y-0 p-4 text-white text-sm">
								<time
									className="text-xs"
									dateTime={new Date(createdAt).toISOString()}
								>
									{new Date(createdAt).toDateString()}
								</time>
							</div>
						</figcaption>
					</figure>
				) : (
					<div className="relative w-full pb-[80%] overflow-hidden rounded-md bg-zinc-200">
						<div
							className="absolute top-0 bottom-0 left-0 right-0 p-4 overflow-hidden prose-sm prose"
							dangerouslySetInnerHTML={{ __html: body }}
						/>

						<div className="absolute top-0 bottom-0 left-0 right-0 flex flex-col justify-between prose-sm prose transition-opacity duration-300 opacity-0 bg-gradient-to-b from-transparent to-primary/90 group-hover:opacity-100">
							<div className="w-full p-4">
								{tags.map((tag) => (
									<span
										key={tag}
										className="text-white inline-block text-xs bg-black rounded-full px-[0.8em] py-[0.2em] leading-none mr-[0.5em]"
									>
										{tag}
									</span>
								))}
							</div>

							<div className="translate-y-[100%] duration-150 group-hover:translate-y-0 p-4 text-white text-sm">
								<time
									className="text-xs"
									dateTime={new Date(createdAt).toISOString()}
								>
									{new Date(createdAt).toDateString()}
								</time>
							</div>
						</div>
					</div>
				)}
				<a
					className="absolute top-0 bottom-0 left-0 right-0 w-full h-full"
					href={`/posts/${postId}`}
					aria-label="go to article"
				/>
			</div>
			<div className="flex flex-row justify-between w-full px-2 mt-2 mb-8">
				<h1 className="text-sm font-bold">{trimText(title, 90)}</h1>
				<AccountBadge profile={creator} />
			</div>
			<InteractionsBadge interactionList={interactions} />
		</article>
	);
};
