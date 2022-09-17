import { PolyButton } from "@components/poly-button/poly-button";
import { useAuth } from "@modules/refound/hooks/use-auth";
import { useRefoundContracts } from "@modules/refound/hooks/use-refound-contracts";
import type { Post } from "@modules/refound/models/post.model";
import type { Profile } from "@modules/refound/models/profile.model";
import type { NextPage } from "next";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export const HomeView: NextPage = () => {
	const { logIn, logOut, walletAddress, isLoggedIn } = useAuth();
	const { getAllProfiles, getAllPosts } = useRefoundContracts();
	const [profiles, setProfiles] = useState<Profile[]>([]);
	const [posts, setPosts] = useState<Post[]>([]);

	useEffect(() => {
		getAllProfiles().then((maybeProfiles) =>
			maybeProfiles.match({
				ok: (profiles) => {
					setProfiles(profiles);
				},
				fail: (err) => {
					toast.error("Failed to get profiles");
				},
			}),
		);

		getAllPosts().then((maybePosts) =>
			maybePosts.match({
				ok: (posts) => {
					setPosts(posts);
				},
				fail: (err) => {
					toast.error("Failed to get posts");
				},
			}),
		);
	}, [walletAddress]);

	return (
		<section>
			<h1 className="font-bold">Home</h1>
			<div>Address: {walletAddress || "-"}</div>

			<h1 className="font-bold">Profiles</h1>
			<pre>{JSON.stringify(profiles, null, "\t")}</pre>

			<h1 className="font-bold">Posts</h1>
			<div>
				{posts &&
					posts.map((post) => (
						<a key={post.postId} href={`/posts/${post.postId}`}>
							<pre>{JSON.stringify(post, null, "\t")}</pre>
						</a>
					))}
			</div>
		</section>
	);
};
