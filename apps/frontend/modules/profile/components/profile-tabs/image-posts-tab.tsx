import { ImagePostCard } from "@modules/posts/components/image-post/image-post-card";
import { useProfile } from "@modules/profile/hooks/use-profile";
import { useEffect } from "react";

export const ImagePostsTab = () => {
	const { loadImagePosts, imagePosts, imagePostsLoadingState } = useProfile();

	useEffect(() => {
		loadImagePosts();
	}, []);

	return (
		<>
			{imagePosts &&
				imagePosts.map((post) => <ImagePostCard imagePost={post} key={post.postId} />)}
		</>
	);
};
