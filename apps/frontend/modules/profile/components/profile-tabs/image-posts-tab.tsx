import { useProfile } from "@modules/profile/hooks/use-profile";
import { useEffect } from "react";

export const ImagePostsTab = () => {
	const { loadImagePosts, imagePosts, imagePostsLoadingState } = useProfile();

	useEffect(() => {
		loadImagePosts();
	}, []);

	return (
		<section>
			<pre>{JSON.stringify({ imagePosts, imagePostsLoadingState })}</pre>
		</section>
	);
};
