import { ImagePostCard } from "@modules/posts/components/image-post/image-post-card";
import type { ImagePostAggregate } from "@modules/refound/models/post.aggregate";

export const ImagePostsTab = ({ imagePosts }: { imagePosts: ImagePostAggregate[] }) => {
	return (
		<>
			{imagePosts &&
				imagePosts.map((post) => <ImagePostCard imagePost={post} key={post.postId} />)}
		</>
	);
};
