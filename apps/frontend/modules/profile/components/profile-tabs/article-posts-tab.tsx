import { useRefoundContracts } from "@modules/refound/hooks/use-refound-contracts";
import type { ArticlePostAggregate } from "@modules/refound/models/post.aggregate";

export const ArticlePostsTab = ({ articlePosts }: { articlePosts: ArticlePostAggregate[] }) => {
	const { interactWithPost } = useRefoundContracts();

	return (
		<section>
			{articlePosts &&
				articlePosts.map((post) => (
					<article key={post.postId} className="overflow-hidden artboard artboard-demo">
						<div className="w-full whitespace-pre-wrap">
							<h1>{post.title}</h1>
						</div>
						<button
							type="button"
							className="btn btn-xs"
							onClick={() => interactWithPost(post.postId, "UpVote")}
						>
							Upvote
						</button>
						<button
							type="button"
							className="btn btn-xs"
							onClick={() => interactWithPost(post.postId, "DownVote")}
						>
							Downvote
						</button>
					</article>
				))}
		</section>
	);
};
