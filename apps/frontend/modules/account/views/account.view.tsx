import { PolyButton } from "@components/poly-button/poly-button";
import { useAuth } from "@modules/refound/hooks/use-auth";
import { useRefoundContracts } from "@modules/refound/hooks/use-refound-contracts";
import type { Post } from "@modules/refound/models/post.model";
import type { NextPage } from "next";
import { useEffect, useState } from "react";

export const AccountView: NextPage = () => {
	const { logIn, logOut, walletAddress, isLoggedIn, profile } = useAuth();
	const { getPostsCreatedByProfile } = useRefoundContracts();
	const [posts, setPosts] = useState<Post[]>([]);

	useEffect(() => {
		if (!walletAddress) return;

		getPostsCreatedByProfile(walletAddress).then((maybePosts) =>
			maybePosts.match({
				ok: (posts) => {
					setPosts(posts);
				},
				fail: (err) => {
					console.error(err);
				},
			}),
		);
	}, [walletAddress]);

	return (
		<section>
			<h1 className="font-bold">Profile Info</h1>
			<pre>{JSON.stringify(profile, null, "\t")}</pre>
			<h1 className="font-bold">Posts</h1>
			<pre>{JSON.stringify(posts, null, "\t")}</pre>
		</section>
	);
};
