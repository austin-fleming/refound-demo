import { PolyButton } from "@components/poly-button/poly-button";
import { toast } from "@services/toast/toast";
import type { Result } from "@utils/monads";
import { result } from "@utils/monads";
import type { NextPage } from "next";
import type { ChangeEvent, MouseEventHandler } from "react";
import { useState } from "react";
import type { ProfileCreationProperties } from "@modules/refound/models/profile.dto";
import { useAuth } from "@modules/refound/hooks/use-auth";
import { useRefoundContracts } from "@modules/refound/hooks/use-refound-contracts";

export const SignUpView: NextPage = () => {
	const { walletAddress, isLoggedIn, logIn, profile } = useAuth();
	const { createProfile, updateProfile, getAllProfiles, getProfile } = useRefoundContracts();

	const [formState, setFormState] = useState<Partial<ProfileCreationProperties>>({});
	const [formStatus, setFormStatus] = useState<
		"NONE" | "READY" | "SUBMITTING" | "DONE" | "ERROR"
	>("NONE");
	const [formError, setFormError] = useState<string | undefined>();

	const getAll = () => {
		getProfile("0x14bac73FAe42b227D484aF9E6eaDe845bE476402").then((users) => {
			users.match({
				ok: (users) => {
					console.log({ users });
					toast.message("Users printed to log");
				},
				fail: () => console.log("no users"),
			});
		});
	};

	const validateForm = (
		unvalidated: Partial<ProfileCreationProperties>,
	): Result<ProfileCreationProperties> => {
		try {
			const { username, avatarUrl, bio } = unvalidated;
			if (!username) throw new Error("username is missing");

			const profile: ProfileCreationProperties = {
				username,
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

		validateForm(formState).match({
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
		});
	};
	const submitUpdateForm: MouseEventHandler<HTMLButtonElement> = (event) => {
		event.preventDefault();

		setFormStatus("SUBMITTING");

		validateForm(formState).match({
			ok: (validProfile) => {
				updateProfile(validProfile).then((profileId) => {
					profileId.match({
						ok: (profileId) => {
							console.log("Created profile id:", profileId);
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
		});
	};

	return (
		<section>
			<h1>Sign up!</h1>
			{isLoggedIn ? (
				<form className="flex flex-col gap-8">
					<label>
						<span>Username</span>
						<input name="username" type="text" onChange={onChange} />
					</label>
					<label>
						<span>Bio</span>
						<textarea name="bio" onChange={onChange} />
					</label>
					<label>
						<span>Avatar Url</span>
						<input name="avatarUrl" type="text" onChange={onChange} />
					</label>
					{formStatus !== "DONE" && (
						<>
							<PolyButton
								as="button"
								label={formStatus === "SUBMITTING" ? "submitting..." : "submit"}
								disabled={formStatus !== "READY"}
								isDisabled={formStatus !== "READY"}
								onClick={submitForm}
							/>
							<PolyButton
								as="button"
								label={formStatus === "SUBMITTING" ? "submitting..." : "update"}
								disabled={formStatus !== "READY"}
								isDisabled={formStatus !== "READY"}
								onClick={submitUpdateForm}
							/>
						</>
					)}
					{formError && <span>{formError}</span>}
					<code>{JSON.stringify(formState)}</code>
				</form>
			) : (
				<div>
					<h2>Connect your wallet to get started!</h2>
					<PolyButton as="button" label="Connect Wallet" onClick={logIn} />
				</div>
			)}
			<PolyButton as="button" label="get users" onClick={getAll} />
			<div>
				<h1>Profile:</h1>
				<code>{JSON.stringify(profile, null, "\t")}</code>
			</div>
		</section>
	);
};
