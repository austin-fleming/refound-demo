import { sleep } from "@repo/common/utils/control-flow";
import { useAuth } from "@modules/account/hooks/auth-context";
import { useSignup } from "@modules/account/hooks/use-signup";
import { usePublicRefoundQueries } from "@modules/common/hooks/public-refound-context";
import { FileDropInput } from "@modules/ui/forms/file-drop-input";
import { ThumbsUpIcon } from "@modules/ui/icons/menu-icons";
import { PopoverLink } from "@modules/ui/popover-link";
import { result } from "@repo/common/utils/monads";
import { toast } from "@services/toast/toast";
import { cloin } from "@utils/styling/cloin";
import type { MouseEventHandler } from "react";
import { useState } from "react";
import { useRouter } from "next/router";

type FormState = {
	username?: string;
	bio?: string;
	avatar?: File;
	avatarWidth?: number;
	avatarHeight?: number;
	acceptedTerms: boolean;
};

type ValidState = {
	username: string;
	bio?: string;
	avatar?: File;
};

const initialState: FormState = {
	username: "",
	bio: "",
	avatar: undefined,
	acceptedTerms: false,
};

export const SignUpForm = () => {
	const router = useRouter();
	const { createAccount, validateAccount } = useSignup();
	const [formData, setFormData] = useState(initialState);
	const [formError, setFormError] = useState<string | undefined>();
	const [formStatus, setFormStatus] = useState<
		"NONE" | "READY" | "SUBMITTING" | "DONE" | "ERROR"
	>("NONE");

	/* const validateForm = async ({
		username,
		avatar,
		acceptedTerms,
		bio,
	}: FormState): Promise<Result<ValidState>> => {
		try {
			if (!acceptedTerms) throw new Error("Please accept terms.");

			const hasProfileAlready = (await profileExists(address!)).extract();
			if (hasProfileAlready) throw new Error("Username is taken");

			if (!username) throw new Error("username is missing");
			const trimmedUsername = username.toLowerCase().trim();
			if (trimmedUsername.length > 15 || trimmedUsername.length < 3)
				throw new Error("username must be 3-15 characters long.");
			const rxIsHandle = /^[a-z0-9_-]{3,15}$/i;
			if (!rxIsHandle.test(trimmedUsername))
				throw new Error("username can only use a-z, 0-9, _, and -");

			const validState: ValidState = { username, bio, avatar };

			setFormStatus("READY");
			setFormError(undefined);
			return result.ok(validState);
		} catch (err) {
			setFormStatus("ERROR");
			setFormError((err as Error).message);
			return result.fail(err as Error);
		}
	}; */

	const handleValidation = async () =>
		(await validateAccount(formData)).match({
			ok: (validatedData) => {
				setFormStatus("READY");
				setFormError(undefined);
				return result.ok(validatedData);
			},
			fail: (err) => {
				setFormStatus("ERROR");
				setFormError((err as Error).message);
				return result.fail(err as Error);
			},
		});

	const handleSubmit: MouseEventHandler = async (e) => {
		e.preventDefault();

		setFormStatus("SUBMITTING");

		(await handleValidation()).match({
			ok: (validData) =>
				createAccount(validData).then((confirmation) =>
					confirmation.match({
						ok: () => {
							setFormStatus("DONE");
							toast.success("Profile Created!", "profileCreate");
							sleep(2000, () => {
								router.push("/discover");
							});
						},
						fail: (err) => {
							console.error(err);
							setFormStatus("ERROR");
							setFormError("Failed to create profile");
							toast.error("Failed to create profile", "profileCreate");
						},
					}),
				),
			fail: () => {},
		});
	};

	return formStatus === "DONE" ? (
		<form className="w-full min-h-[50vh] flex flex-col gap-12 justify-center items-center border-4 bg-success/10 shadow-md rounded-2xl border-solid border-success text-success">
			<ThumbsUpIcon className="w-12 h-12" />
			<p className="text-2xl font-bold">Profile Created!</p>
		</form>
	) : (
		<form className="flex flex-col w-full gap-4 mb-12">
			<div className="prose-sm text-center max-w-[35ch] mx-auto">
				<p>
					Your account will be minted on the Celo blockchain. Make sure you{" "}
					<a
						href="https://celo.org/developers/faucet"
						target="_blank"
						rel="noreferrer"
						className="link"
					>
						have some funds
					</a>{" "}
					in your wallet to cover the few cents it costs to create the profile.{" "}
				</p>
				<PopoverLink label="Why do I pay to create an account?">
					<div className="prose-sm prose">
						<h3>Why Creating an Account Isn&apos;t Free</h3>
						<p className="italic">
							We don&apos;t make money or process these payments.
						</p>
						<p>
							When you create an account, you are saving it to the blockchain. Unlike
							traditional social platforms, we don&apos;t control the accounts, posts,
							or funds you create on Refound. While this gives you unprecedented
							control over your content, it also means{" "}
							<span className="font-bold">
								you directly pay the costs of accessing the blockchain.
							</span>
						</p>
					</div>
				</PopoverLink>
			</div>

			<div className="w-full form-control">
				<label htmlFor="username" className="font-bold label">
					<span className="label-text">
						Username <span className="text-error">*</span>
					</span>
				</label>
				<input
					type="text"
					name="username"
					placeholder="my-username"
					className="w-full input input-bordered"
					onChange={(e) => {
						setFormData({ ...formData, username: e.target.value });
					}}
					onBlur={handleValidation}
					value={formData.username}
					required
				/>
				<label className="label">
					<span className="label-text-alt">3-15 characters. a-z, _, -, 0-9</span>
				</label>
			</div>

			{/* TODO: web3storage upload */}
			{/* <div className="w-full form-control">
				<label htmlFor="avatarUrl" className="font-bold label">
					<span className="label-text">Profile Image URL</span>
				</label>
				<input
					type="text"
					name="avatarUrl"
					placeholder="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe"
					className="w-full input input-bordered"
				/>
			</div> */}
			<div className="form-control">
				<label className="font-bold label" htmlFor="avatar">
					<span className="label-text">Profile Image</span>
				</label>
				<FileDropInput
					fieldName="avatar"
					setProps={({ image, width, height }) => {
						setFormData({
							...formData,
							avatar: image,
							avatarHeight: height,
							avatarWidth: width,
						});

						handleValidation();
					}}
					uploadedImage={
						formData.avatar && formData.avatarWidth && formData.avatarHeight
							? {
									image: formData.avatar,
									width: formData.avatarWidth,
									height: formData.avatarHeight,
							  }
							: undefined
					}
				/>
			</div>

			<div className="form-control">
				<label className="font-bold label" htmlFor="bio">
					<span className="label-text">Bio</span>
				</label>
				<textarea
					className="h-24 textarea textarea-bordered"
					placeholder="Bio"
					name="bio"
					value={formData.bio}
					onBlur={handleValidation}
					onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
				/>
			</div>

			<div className="form-control">
				<label htmlFor="acceptedTerms" className="font-bold cursor-pointer label">
					<span className="label-text">
						I agree to Refound&apos;s{" "}
						<a className="link" target="_blank" href="/legal/terms">
							terms and conditions
						</a>{" "}
						<span className="text-error">*</span>
					</span>
					<input
						name="acceptedTerms"
						type="checkbox"
						checked={formData.acceptedTerms}
						required
						onBlur={handleValidation}
						onChange={(e) => {
							setFormData({ ...formData, acceptedTerms: e.target.checked });
						}}
						className="checkbox"
					/>
				</label>
			</div>

			<button
				type="submit"
				disabled={!formData.acceptedTerms || formStatus === "NONE"}
				className={cloin(
					"btn",
					formStatus === "SUBMITTING" && "loading",
					formStatus === "ERROR" && "btn-error",
					formStatus !== "READY" && "pointer-events-none",
				)}
				onClick={handleSubmit}
			>
				{formStatus === "SUBMITTING" && "Submitting"}
				{formStatus !== "SUBMITTING" && "Create Account"}
			</button>

			{formError && <span className="w-full text-center text-error">{formError}</span>}
		</form>
	);
};
