import { PolyButton } from "@components/poly-button/poly-button";
import { toast } from "@services/toast/toast";
import type { Result } from "@utils/monads";
import { result } from "@utils/monads";
import type { NextPage } from "next";
import type { ChangeEvent, MouseEventHandler } from "react";
import { useEffect } from "react";
import { useState } from "react";
import type { ProfileCreationProperties } from "@modules/refound/models/profile.dto";
import { useRefoundContracts } from "@modules/refound/hooks/use-refound-contracts";
import { useAccount } from "../state/use-account";
import { useRouter } from "next/router";

const rxIsHandle = /^[a-z0-9_-]{3,15}$/i;

export const SignUpView: NextPage = () => {
	const { login, account } = useAccount();
	const router = useRouter();

	const { createProfile, getProfileByUsername } = useRefoundContracts();

	const [formState, setFormState] = useState<Partial<ProfileCreationProperties>>({});
	const [formStatus, setFormStatus] = useState<
		"NONE" | "READY" | "SUBMITTING" | "DONE" | "ERROR"
	>("NONE");
	const [formError, setFormError] = useState<string | undefined>();

	const validateForm = async (
		unvalidated: Partial<ProfileCreationProperties>,
	): Promise<Result<ProfileCreationProperties>> => {
		try {
			const { username, avatarUrl, bio } = unvalidated;
			if (!username) throw new Error("username is missing");
			const trimmedUsername = username.toLowerCase().trim();
			if (trimmedUsername.length > 15 || trimmedUsername.length < 3)
				throw new Error("username must be 3-15 characters long.");
			if (!rxIsHandle.test(trimmedUsername))
				throw new Error("username can use a-z, 0-9, _, and -");

			const alreadyExists = (await getProfileByUsername(trimmedUsername)).isOk();
			if (alreadyExists) throw new Error("username already exists");

			const profile: ProfileCreationProperties = {
				username: trimmedUsername,
				avatarUrl,
				bio,
			};

			setFormStatus("READY");
			setFormError(undefined);
			return result.ok(profile);
		} catch (err) {
			setFormStatus("ERROR");
			setFormError((err as Error).message);
			return result.fail(err as Error);
		}
	};

	const onChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		setFormState({
			...formState,
			[event.target.name]: event.target.value,
		});

		validateForm(formState);
	};

	const submitForm: MouseEventHandler<HTMLButtonElement> = (event) => {
		event.preventDefault();

		setFormStatus("SUBMITTING");

		validateForm(formState).then((validProfile) =>
			validProfile.match({
				ok: (validProfile) => {
					createProfile(validProfile).then((profileId) => {
						profileId.match({
							ok: (profileId) => {
								setFormStatus("DONE");
								toast.success("Profile Created!");
							},
							fail: (err) => {
								console.error(err);
								setFormStatus("ERROR");
								setFormError("Failed to create profile");
								toast.error("Failed to create profile");
							},
						});
					});
				},
				fail: () => {},
			}),
		);
	};

	useEffect(() => {
		if (account.status === "CONNECTED" && account.hasProfile === true) {
			router.push("/discover");
		}
	}, [account]);

	useEffect(() => {
		if (formStatus === "DONE") {
			router.push("/account");
		}
	}, [formStatus]);

	return (
		<section className="flex flex-col items-center w-full max-w-screen-md gap-12 py-8 mx-auto px-contentPadding">
			<h1 className="text-2xl font-bold">Welcome to Refound</h1>
			<ul className="steps">
				<li className={`step step-neutral`}>
					<span className="text-xs font-bold tracking-wide px-[1em]">
						Connect Your Wallet
					</span>
				</li>
				<li className={`step ${account.address ? "step-neutral" : ""}`}>
					<span className="text-xs font-bold tracking-wide px-[1em]">
						Create Your Profile
					</span>
				</li>
			</ul>

			{!account?.address ? (
				<>
					<button
						type="button"
						className="rounded-md btn btn-lg hover:bg-violet-900"
						onClick={login}
					>
						Connect Your Wallet
					</button>

					<div className="prose prose-sm max-w-[40ch] text-center text-slate-900 leading-tight">
						<p className="font-bold">
							This site is running on Celo&apos;s Alfajores network.
						</p>
						<p>
							Make sure you have a Celo/Alfajores compatible wallet such as MetaMask
							or{" "}
							<a
								href="https://alfajores.celowallet.app/setup"
								target="_blank"
								rel="noreferrer"
							>
								the developer version
							</a>{" "}
							of Celo wallet installed so you can sign into this site.
							<p>
								If you need some free test funds, you can{" "}
								<a
									href="https://celo.org/developers/faucet"
									target="_blank"
									rel="noreferrer"
									className="underline"
								>
									visit this link
								</a>
								.
							</p>
						</p>
					</div>
				</>
			) : (
				<>
					<form className="flex flex-col w-full gap-8">
						<label className="flex flex-col">
							<span className="text-sm font-bold">Username</span>
							<input name="username" type="text" onChange={onChange} />
						</label>

						<label className="flex flex-col">
							<span className="text-sm font-bold">Bio</span>
							<textarea name="bio" onChange={onChange} />
						</label>

						<label className="flex flex-col">
							<span className="text-sm font-bold">Avatar Url</span>
							<input name="avatarUrl" type="text" onChange={onChange} />
						</label>

						{formStatus !== "DONE" && (
							<PolyButton
								as="button"
								label={formStatus === "SUBMITTING" ? "submitting..." : "submit"}
								isDisabled={formStatus !== "READY"}
								onClick={submitForm}
								icon="rightArrow"
							/>
						)}
						{formError && <span>{formError}</span>}
					</form>
					<p className="prose prose-sm max-w-[32ch] text-center text-slate-900">
						Your profile will be minted as an NFT to the Celo blockchain.
					</p>
				</>
			)}
		</section>
	);
};
