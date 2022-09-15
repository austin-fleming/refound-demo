import { useCelo, Alfajores } from "@celo/react-celo";
import { PolyButton } from "@components/poly-button/poly-button";
import type { Account } from "@modules/mocks/account";
import { ConnectToContract } from "@modules/mocks/onchain/connect-to-contract";
import { useAuth } from "@modules/auth/hooks/use-auth";
import type { Profile } from "@modules/contracts/hooks/use-refound-contract/profile";
import { useRefoundContract } from "@modules/contracts/hooks/use-refound-contract/use-refound-contract";
import type { Nullable } from "@utils/monads";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export const HomePage = () => {
	const { logIn, logOut, walletAddress, isLoggedIn } = useAuth();
	const { getProfile, putProfile } = useRefoundContract();
	const [profile, setProfile] = useState<Nullable<Profile>>(null);

	const makeProfile = async () => {
		// TODO: move to sign-up
		if (!walletAddress) return;

		const dummyProfile: Profile = {
			type: "Profile",
			username: "0xAustin",
			avatarUrl:
				"https://images.unsplash.com/photo-1517849845537-4d257902454a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1935&q=80",
			address: walletAddress,
			status: "VERIFIED",
			bio: "My name is Austin and this is my profile.",
			slug: "/u/0xAustin",
			joinedOn: new Date(),
		};
		const maybeProfile = await putProfile(dummyProfile);
	};

	useEffect(() => {
		if (!walletAddress || !isLoggedIn) return;

		getProfile(walletAddress).then((data) => setProfile(data));
	}, [isLoggedIn, walletAddress]);

	return (
		<section>
			<ConnectToContract />
			<h1>Home</h1>
			<div>Is Logged In: {isLoggedIn ? "true" : "false"}</div>
			{walletAddress ? (
				<>
					<PolyButton as="button" onClick={logOut} label={"Disconnect"} />
					<PolyButton as="button" onClick={makeProfile} label={"Make dummy profile"} />
				</>
			) : (
				<PolyButton as="button" onClick={logIn} label="Connect" />
			)}
			<div>
				<h2>Profile Data:</h2>
				<code>{profile ? JSON.stringify(profile, null, "\t") : "none"}</code>
			</div>
		</section>
	);
};
