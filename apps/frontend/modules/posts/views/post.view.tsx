import { useAccount } from "@modules/account/state/use-account";
import { useRefoundContracts } from "@modules/refound/hooks/use-refound-contracts";
import type { Post } from "@modules/refound/models/post.model";
import type { Nullable } from "@utils/monads";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export const PostView: NextPage = () => {
	const router = useRouter();
	const { getPost } = useRefoundContracts();
	const { account } = useAccount();
	const [post, setPost] = useState<Nullable<Post>>(null);

	useEffect(() => {
		const { postId } = router.query;

		console.log({ postView: postId });

		getPost(postId as string).then((maybePost) =>
			maybePost.match({
				ok: (post) => {
					setPost(post);
				},
				fail: (err) => {
					toast.error("Failed to get post");
				},
			}),
		);
	}, [account.address]);

	return (
		<section>
			<h1 className="font-bold">Post</h1>
			{post && <pre>{(JSON.stringify(post), null, "\t")}</pre>}
		</section>
	);
};

/* 
type contentTag = 'VIOLENCE' | 'NUDITY'

Post struct {
    data: string;
    contentTags : ContentTag[]
}

*/
