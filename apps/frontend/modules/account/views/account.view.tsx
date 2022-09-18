import { PolyButton } from "@components/poly-button/poly-button";
import { useRefoundContracts } from "@modules/refound/hooks/use-refound-contracts";
import type { Post } from "@modules/refound/models/post.model";
import type { NextPage } from "next";
import { useEffect, useState } from "react";
import { useAccount } from "../state/use-account";

export const AccountView: NextPage = () => {
	const { account } = useAccount();
	const { getPostsByProfile } = useRefoundContracts();
	const [posts, setPosts] = useState<Post[]>([]);

	useEffect(() => {
		if (!account.address) return;

		getPostsByProfile(account.address).then((maybePosts) =>
			maybePosts.match({
				ok: (posts) => {
					setPosts(posts);
				},
				fail: (err) => {
					console.error(err);
				},
			}),
		);
	}, [account.address]);

	return (
		<section>
			<h1 className="font-bold">Profile Info</h1>
			<pre>{JSON.stringify(account.profile, null, "\t")}</pre>
			<h1 className="font-bold">Posts</h1>
			<pre>{JSON.stringify(posts, null, "\t")}</pre>
		</section>
	);
};
