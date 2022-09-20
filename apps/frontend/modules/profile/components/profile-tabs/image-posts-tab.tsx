import { useProfile } from "@modules/profile/hooks/use-profile";
import { useEffect } from "react";

export const ImagePostsTab = () => {
	const { loadImagePosts, imagePosts, imagePostsLoadingState } = useProfile();

	useEffect(() => {
		loadImagePosts();
	}, []);

	return (
		<section>
			{imagePosts &&
				imagePosts.map((post) => (
					<article key={post.postId} className="overflow-hidden artboard artboard-demo">
						<div className="w-full whitespace-pre-wrap">
							<h1>{post.title}</h1>
						</div>
					</article>
				))}
		</section>
	);
};
