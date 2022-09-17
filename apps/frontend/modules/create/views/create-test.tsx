import { PolyButton } from "@components/poly-button/poly-button";
import { useAuth } from "@modules/refound/hooks/use-auth";
import { useRefoundContracts } from "@modules/refound/hooks/use-refound-contracts";
import type { ImagePostCreationProps } from "@modules/refound/models/post.dto";
import type { NextPage } from "next";
import { useState } from "react";
import toast from "react-hot-toast";

export const CreateTestView: NextPage = () => {
	const { logIn, logOut, walletAddress, isLoggedIn } = useAuth();
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
			<div>Address: {walletAddress || "-"}</div>
			{formState.image && (
				<img className="w-[300px]" src={URL.createObjectURL(formState.image)} />
			)}
			<PolyButton
				label={"submit"}
				as="button"
				onClick={(e) => {
					e.preventDefault();

					console.log({ formSubmission: formState });

					if (walletAddress && formState.image) {
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
/* "Transaction has been reverted by the EVM:
{
  "blockHash": "0x4697bd5c45a77c4c4e5e3fe5dce032e43f1924f76be728113e1b1f5d9d471717",
  "blockNumber": 13613225,
  "contractAddress": null,
  "cumulativeGasUsed": 106131,
  "effectiveGasPrice": 500000000,
  "from": "0x14bac73fae42b227d484af9e6eade845be476402",
  "gasUsed": 106131,
  "logsBloom": "0x00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000",
  "status": false,
  "to": "0x07f2433c606bbde4ad2bb8261980b885b5fdc7d9",
  "transactionHash": "0xfbd8a49fdc16cc5c5456859a15b993f3883618b8f083be917bb68d68c442bcee",
  "transactionIndex": 0,
  "events": {}
}" */

/* 
"{"type":"POST","cid":"bafybeia2qfvsfn3kalwsbtp4h23ann6nkwmv7mg3khtkydi4dgzq2a5kfi","host":"IPFS","postType":"IMAGE","metadataPath":"metadata.json","imagePath":"susan-wilkinson-4KK5EKyW79w-unsplash.jpeg"}"
*/
