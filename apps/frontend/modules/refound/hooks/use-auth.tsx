import type { Nullable } from "@utils/monads";
import type { ReactNode } from "react";
import { useCallback } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { createContext, useContext } from "react";
import { CeloProvider, useCelo, Alfajores } from "@celo/react-celo";
import { toast } from "@services/toast/toast";
import type { Profile, ProfileOwnerAddress } from "../models/profile.model";
import { useRefoundContracts } from "./use-refound-contracts";
import { useRouter } from "next/router";
import { fetchWithAddress } from "./utils/fetch-with-address";

/* TODO: use a reducer to make state clearer */
/* TODO: should load profile */

type AuthState = {
	walletAddress: Nullable<string>;
	isLoggedIn: boolean;
	logIn: () => Promise<void>;
	logOut: () => Promise<void>;
	profile: Nullable<Profile>;
};

const initialAuthState: AuthState = {
	walletAddress: null,
	isLoggedIn: false,
	logIn: async () => {},
	logOut: async () => {},
	profile: null,
};

const AuthContext = createContext<AuthState>(initialAuthState);
export const useAuth = () => useContext(AuthContext);

const InnerProvider = ({ children }: { children: ReactNode }) => {
	const router = useRouter();
	const { address, connect, disconnect, kit } = useCelo();
	const { getProfile } = useRefoundContracts();
	const [walletAddress, setWalletAddress] = useState<AuthState["walletAddress"]>(null);
	const [isLoggedIn, setIsLoggedIn] = useState<AuthState["isLoggedIn"]>(false);
	const [profile, setProfile] = useState<AuthState["profile"]>(null);

	const loadAuthSummary = async () => {
		setWalletAddress(address);

		if (!address) return;
		const { CELO, cUSD, cEUR, cREAL } = await kit.getTotalBalance(address);
		console.log({ CELO, cUSD, cEUR, cREAL });
	};

	useEffect(() => {
		setIsLoggedIn(!!address);

		if (!isLoggedIn) return;

		loadAuthSummary();
	}, [address, isLoggedIn]);

	const logIn = async () => {
		await connect()
			.then((onFullfilled) => {
				toast.success("Logged In");
			})
			.catch((err) => {
				console.error(err);
				toast.error("Failed to connect to wallet.");
			});
	};

	const logOut = async () => {
		await disconnect()
			.then(() => {
				setWalletAddress(initialAuthState.walletAddress);
				setIsLoggedIn(false);
				setProfile(null);
				toast.success("Logged Out");
			})
			.catch((err) => {
				console.error(err);
				toast.error("Failed to disconnect wallet.");
			});
	};

	const loadProfile = async (profileAddress: ProfileOwnerAddress) => {
		toast.message("Loading profile");
		console.log({ profileAddress });

		const maybeProfile = (await getProfile(profileAddress)).match({
			ok: (userProfile) => {
				setProfile(userProfile);
				console.log("Profile loaded");
			},
			fail: (err) => {
				toast.warning("No Profile found");
				console.warn("Could not load user profile");
				console.error(err);
				router.push("/sign-up");
			},
		});
	};

	useEffect(() => {
		if (!walletAddress || !isLoggedIn) return;

		fetchWithAddress<Profile>(`/api/users/${walletAddress}`, walletAddress).then(
			(maybeProfile) =>
				maybeProfile.match({
					ok: (userProfile) => {
						setProfile(userProfile);
						console.log({ "Profile loaded": userProfile });
					},
					fail: (err) => {
						toast.warning("No Profile found");
						console.warn("Could not load user profile");
						console.error(err);
						router.push("/sign-up");
					},
				}),
		);
	}, [walletAddress, isLoggedIn]);

	return (
		<AuthContext.Provider
			value={{
				walletAddress,
				isLoggedIn,
				logIn,
				logOut,
				profile,
			}}
		>
			{children}
		</AuthContext.Provider>
	);
};

export const AuthContextProvider = ({ children }: { children: ReactNode }) => {
	return (
		<CeloProvider
			dapp={{
				name: "Refound",
				description: "Mint it back to life",
				icon: "https://refound.app/assets/login-icon.png",
				url: "https://refound.app",
			}}
			defaultNetwork={Alfajores.name}
			connectModal={{
				title: <span>Connect your Wallet</span>,
				providersOptions: {
					searchable: true,
				},
			}}
		>
			<InnerProvider>{children}</InnerProvider>
		</CeloProvider>
	);
};
