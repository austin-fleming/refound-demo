import type { NextPage } from "next";

import { PostType } from "@modules/refound/models/post.model";
import { useState } from "react";
import { ImagePostForm } from "../components/image-post-form";
import { ArticlePostForm } from "../components/article-post-form";

export const CreateView: NextPage = () => {
	const [postType, setPostType] = useState<PostType>(PostType.IMAGE);

	return (
		<section className="flex flex-col w-full max-w-screen-md mx-auto min-h-[101vh]">
			<div className="flex flex-row w-full text-center justify-items-stretch">
				<button
					type="button"
					aria-label="use image post form"
					aria-current={postType === PostType.IMAGE}
					className={`w-full text-base font-bold tracking-wide py-[0.75em] border-b-2 border-solid ${
						postType === PostType.IMAGE
							? "border-black"
							: "border-slate-200 text-slate-400"
					}`}
					onClick={() => {
						setPostType(PostType.IMAGE);
					}}
				>
					Image
				</button>
				<button
					type="button"
					aria-label="use article post form"
					aria-current={postType === PostType.ARTICLE}
					className={`w-full text-base font-bold tracking-wide py-[0.75em] border-b-2 border-solid ${
						postType === PostType.ARTICLE
							? "border-black"
							: "border-slate-200 text-slate-400"
					}`}
					onClick={() => {
						setPostType(PostType.ARTICLE);
					}}
				>
					Article
				</button>
			</div>
			{postType === PostType.IMAGE && <ImagePostForm />}
			{postType === PostType.ARTICLE && <ArticlePostForm />}
		</section>
	);
};
