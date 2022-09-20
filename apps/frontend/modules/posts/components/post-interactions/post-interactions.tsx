import { DownArrowIcon, FlagIcon, UpArrowIcon } from "@components/icons/menu-icons";
import { useRefoundContracts } from "@modules/refound/hooks/use-refound-contracts";
import type { PostAggregate } from "@modules/refound/models/post.aggregate";
import { toast } from "@services/toast/toast";
import { cloin } from "@utils/cloin";
import { useState } from "react";

export const PostInteractions = ({ post }: { post: PostAggregate }) => {
	const { interactWithPost } = useRefoundContracts();
	const [upvoteState, setUpvoteState] = useState<"IDLE" | "SUBMITTING" | "SUCCESS" | "FAIL">(
		"IDLE",
	);
	const [downvoteState, setDownvoteState] = useState<"IDLE" | "SUBMITTING" | "SUCCESS" | "FAIL">(
		"IDLE",
	);
	const [reportState, setReportState] = useState<"IDLE" | "SUBMITTING" | "SUCCESS" | "FAIL">(
		"IDLE",
	);

	return (
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
					{downvoteState === "SUCCESS" ? "Downvoted!" : post.interactions.DownVote}
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
	);
};
