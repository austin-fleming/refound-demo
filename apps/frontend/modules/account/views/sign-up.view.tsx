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

export const SignUpView: NextPage = () => {
	const { login, account } = useAccount();
	const router = useRouter();

	const { createProfile, updateProfile, getAllProfiles } = useRefoundContracts();

	const [formState, setFormState] = useState<Partial<ProfileCreationProperties>>({});
	const [formStatus, setFormStatus] = useState<
		"NONE" | "READY" | "SUBMITTING" | "DONE" | "ERROR"
	>("NONE");
	const [formError, setFormError] = useState<string | undefined>();

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

	useEffect(() => {
		if (formStatus === "DONE") {
			router.push("/account");
		}
	}, [formStatus]);

	return (
		<section className="w-full max-w-screen-md py-8 mx-auto px-contentPadding">
			<h1 className="w-full mb-4 font-bold text-center">Create Your Profile</h1>
			<form className="flex flex-col gap-8">
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
					/>
				)}
				{formError && <span>{formError}</span>}
			</form>
		</section>
	);
};
