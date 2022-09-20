import { DownArrowIcon, FlagIcon, UpArrowIcon } from "@components/icons/menu-icons";
import { LoadingPage } from "@components/loading-page/loading-page";
import { useAccount } from "@modules/account/state/use-account";
import { useRefoundContracts } from "@modules/refound/hooks/use-refound-contracts";
import type { PostAggregate } from "@modules/refound/models/post.aggregate";
import type { Post } from "@modules/refound/models/post.model";
import { queries } from "@modules/refound/repo/refound-post-contract.repo";
import { cloin } from "@utils/cloin";
import { isNothing, Nullable } from "@utils/monads";
import { result } from "@utils/monads";
import axios from "axios";
import { config } from "config/config";
import type { GetStaticPaths, GetStaticProps, InferGetStaticPropsType, NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Web3 from "web3";

export const getStaticPaths: GetStaticPaths<{ postId: string }> = async () => {
	return {
		fallback: true,
		paths: [
			{
				params: { postId: "0" },
			},
		],
	};
};

export const getStaticProps: GetStaticProps = async (context) => {
	if (isNothing(context.params?.postId)) return { notFound: true };

	const web3 = new Web3(config.contracts.rpcUrl);
	const coreContract = new web3.eth.Contract(
		config.contracts.coreContract.abi,
		config.contracts.coreContract.address,
	);
	const postContract = new web3.eth.Contract(
		config.contracts.postContract.abi,
		config.contracts.postContract.address,
	);

	return (await queries.getPost(coreContract, postContract, context.params.postId)).match({
		ok: (post) => ({
			props: {
				post: JSON.parse(JSON.stringify(post)),
			},
			revalidate: 10,
		}),
		fail: () => ({
			notFound: true,
		}),
	});
};

const PostView: NextPage<{ post: PostAggregate }> = ({ post }) => {
	console.log({ post });
	const router = useRouter();
	const { interactWithPost } = useRefoundContracts();
	const { account } = useAccount();
	const [upvoteState, setUpvoteState] = useState<"IDLE" | "SUBMITTING" | "SUCCESS" | "FAIL">(
		"IDLE",
	);
	const [downvoteState, setDownvoteState] = useState<"IDLE" | "SUBMITTING" | "SUCCESS" | "FAIL">(
		"IDLE",
	);
	const [reportState, setReportState] = useState<"IDLE" | "SUBMITTING" | "SUCCESS" | "FAIL">(
		"IDLE",
	);

	if (router.isFallback) return <LoadingPage />;

	return (
		<section className="w-full max-w-screen-lg mx-auto">
			<h1 className="font-bold">{post.title}</h1>

			<p className="font-mono">{post.postId}</p>

			<div className="flex flex-row gap-2">
				<button
					type="button"
					className={cloin(
						"btn gap-2",
						upvoteState === "SUBMITTING" && "loading btn-disabled",
						upvoteState === "SUCCESS" && "btn-success",
						upvoteState === "FAIL" && "btn-error",
					)}
					onClick={() => {
						if (upvoteState !== "IDLE") return;
						setUpvoteState("SUBMITTING");

						interactWithPost(post.postId, "UpVote").then((confirmation) => {
							confirmation.match({
								ok: () => {
									setUpvoteState("SUCCESS");
									toast.success("Upvoted!");
								},
								fail: () => {
									setUpvoteState("IDLE");
									toast.error("Upvote failed.");
								},
							});
						});
					}}
				>
					<UpArrowIcon filled className="h-[1.2em] w-[1.2em]" />
					{upvoteState === "SUCCESS" ? "Upvoted!" : "Upvote"}
				</button>

				<button
					type="button"
					className={cloin(
						"btn gap-2",
						downvoteState === "SUBMITTING" && "loading btn-disabled",
						downvoteState === "SUCCESS" && "btn-success",
						downvoteState === "FAIL" && "btn-error",
					)}
					onClick={() => {
						if (downvoteState !== "IDLE") return;
						setDownvoteState("SUBMITTING");

						interactWithPost(post.postId, "DownVote").then((confirmation) => {
							confirmation.match({
								ok: () => {
									setDownvoteState("SUCCESS");
									toast.success("Downvoted!");
								},
								fail: () => {
									setDownvoteState("IDLE");
									toast.error("Downvote failed.");
								},
							});
						});
					}}
				>
					<DownArrowIcon filled className="h-[1.2em] w-[1.2em]" />
					{downvoteState === "SUCCESS" ? "Downvoted!" : "Downvote"}
				</button>

				<button
					type="button"
					className={cloin(
						"btn gap-2",
						reportState === "SUBMITTING" && "loading btn-disabled",
						reportState === "SUCCESS" && "btn-success",
						reportState === "FAIL" && "btn-error",
					)}
					onClick={() => {
						if (reportState !== "IDLE") return;
						setReportState("SUBMITTING");

						interactWithPost(post.postId, "Report").then((confirmation) => {
							confirmation.match({
								ok: () => {
									setReportState("SUCCESS");
									toast.success("Reported!");
								},
								fail: () => {
									setReportState("IDLE");
									toast.error("Report failed.");
								},
							});
						});
					}}
				>
					<FlagIcon filled className="h-[1.2em] w-[1.2em]" />
					{reportState === "SUCCESS" ? "Reported!" : "Report"}
				</button>

				<a
					className={cloin("btn", !post && "btn-disabled")}
					target="_blank"
					href={
						post
							? `https://twitter.com/share?url=https://refound.app/posts/${post.postId}`
							: ""
					}
					rel="noreferrer"
				>
					Tweet
				</a>
			</div>

			{post && <pre>{JSON.stringify(post, null, "\t")}</pre>}
		</section>
	);
};

export default PostView;
