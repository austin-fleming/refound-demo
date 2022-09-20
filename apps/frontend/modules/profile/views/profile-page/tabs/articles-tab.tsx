import { useProfileContext } from "@modules/mocks/profile-context";
import { useEffect } from "react";

export const ArticlesTab = () => {
	const { textPosts, loadTextPosts } = useProfileContext();

	useEffect(() => {
		loadTextPosts();
	}, []);

	return (
		<div>
			<h2>Articles</h2>
			<div>
				{textPosts?.map((post) => (
					<article key={post.id}>
						<code>{JSON.stringify(post, null, "\t")}</code>
					</article>
				))}
			</div>
		</div>
	);
};
