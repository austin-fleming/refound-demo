import { PolyButton } from "@components/poly-button/poly-button";
import { useAccount } from "@modules/account/state/use-account";
import { useRefoundContracts } from "@modules/refound/hooks/use-refound-contracts";
import type { ImagePostCreationProps } from "@modules/refound/models/post.dto";
import type { NextPage } from "next";
import { useState } from "react";
import toast from "react-hot-toast";

export const CreateTestView: NextPage = () => {
	const { account } = useAccount();
	const { createImagePost } = useRefoundContracts();

	const [formState, setFormState] = useState<{ image: File; props: ImagePostCreationProps }>({
		image: null,
		props: null,
	});

	return (
		<section>
			<h1>Create Test</h1>
			<input
				onChange={(event) => {
					setFormState({ ...formState, image: event.target.files[0] });
				}}
				type="file"
				id="avatar"
				name="avatar"
				accept="image/png, image/jpeg"
			/>
			<div>Address: {account.address || "-"}</div>
			{formState.image && (
				<img className="w-[300px]" src={URL.createObjectURL(formState.image)} />
			)}
			<PolyButton
				label={"submit"}
				as="button"
				onClick={(e) => {
					e.preventDefault();

					if (account.address && formState.image) {
						createImagePost(formState.image, {
							width: 1000,
							height: 1000,
							title: "a sample image",
						}).then((maybePostId) =>
							maybePostId.match({
								ok: (postId) => {
									toast.success("Post created");
									console.log({ postFormSuccess: postId });
								},
								fail: (err) => {
									toast.error("Post failed");
									console.error({ postFormFailure: err });
								},
							}),
						);
					}
				}}
			/>
		</section>
	);
};
