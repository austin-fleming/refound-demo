import { DownArrowIcon, FlagIcon, UpArrowIcon } from "@components/icons/menu-icons";
import { LoadingPage } from "@components/loading-page/loading-page";
import { useAccount } from "@modules/account/state/use-account";
import { useRefoundContracts } from "@modules/refound/hooks/use-refound-contracts";
import type { PostAggregate } from "@modules/refound/models/post.aggregate";
import { Post, PostType } from "@modules/refound/models/post.model";
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
import NextImage from "next/image";
import { LicensePost } from "../components/license-post/license-post";

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
	const [licenseState, setLicenseState] = useState<"IDLE" | "SUBMITTING" | "SUCCESS" | "FAIL">(
		"IDLE",
	);

	if (router.isFallback) return <LoadingPage />;

	return (
		<section className="flex flex-col w-full max-w-screen-lg gap-8 py-8 mx-auto px-contentPadding">
			<h1 className="text-4xl font-bold">{post.title}</h1>

			<div className="flex flex-row flex-wrap justify-between w-full gap-2">
				<div className="flex flex-row items-start gap-2">
					<div className="tooltip" data-tip="Upvote this post">
						<button
							type="button"
							className={cloin(
								"btn btn-sm gap-2 font-mono flex-nowrap",
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
							{upvoteState === "SUCCESS" ? "Upvoted!" : post.interactions.UpVote}
						</button>
					</div>

					<div className="tooltip" data-tip="Downvote this post">
						<button
							type="button"
							className={cloin(
								"btn btn-sm gap-2 font-mono  flex-nowrap",
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
							{downvoteState === "SUCCESS"
								? "Downvoted!"
								: post.interactions.DownVote}
						</button>
					</div>

					<div className="tooltip" data-tip="Report this post">
						<button
							type="button"
							className={cloin(
								"btn btn-sm gap-2 font-mono flex-nowrap",
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
							{reportState === "SUCCESS" ? "Reported!" : post.interactions.Report}
						</button>
					</div>

					<a
						className={cloin("btn btn-sm", !post && "btn-disabled")}
						target="_blank"
						href={
							post
								? `https://twitter.com/share?url=https://refound.app/posts/${post.postId}`
								: ""
						}
						rel="noreferrer"
					>
						Share on Twitter
					</a>
				</div>

				<LicensePost post={post} />
			</div>

			{post.postType === PostType.IMAGE && (
				<figure className="w-full overflow-hidden rounded-lg">
					<NextImage
						src={post.imageSource}
						width={post.width}
						height={post.height}
						alt={post.title}
						layout="responsive"
					/>

					{post.description && (
						<p className="text-base max-w-[50ch] mt-4">{post.description}</p>
					)}
				</figure>
			)}

			{post.postType === PostType.ARTICLE && (
				<div className="prose" dangerouslySetInnerHTML={{ __html: post.body }} />
			)}

			<div className="flex flex-row flex-wrap gap-8">
				{post.tags.length > 0 && (
					<div>
						<p className="text-sm font-bold mb-[0.5em]">Tags</p>
						<div>
							{post.tags.map((tag) => (
								<span
									key={tag}
									className="border-[1px] border-solid border-black text-black inline-block text-sm rounded-full px-[0.9em] pt-[0.25em] pb-[0.4em] leading-none mr-[0.5em]"
								>
									{tag}
								</span>
							))}
						</div>
					</div>
				)}
				{post.location && (
					<div>
						<p className="text-sm font-bold mb-[0.5em]">Location</p>
						<span className="border-[1px] border-solid border-black text-black inline-block text-sm rounded-full px-[0.9em] pt-[0.25em] pb-[0.4em] leading-none mr-[0.5em]">
							{post.location}
						</span>
					</div>
				)}
				<div>
					<p className="text-sm font-bold mb-[0.5em]">By</p>
					<a
						href={`/u/${post.creator.username}`}
						className="border-[1px] font-bold border-transparent underline border-black text-black inline-block text-sm pt-[0.25em] pb-[0.4em] leading-none mr-[0.5em]"
					>
						@{post.creator.username}
					</a>
				</div>
			</div>
		</section>
	);
};

export default PostView;
