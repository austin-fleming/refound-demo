import type { Nullable } from "@utils/monads";
import type { ReactNode } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { createContext, useContext } from "react";
import { CeloProvider, useCelo, Alfajores, NetworkNames } from "@celo/react-celo";
import { toast } from "@services/toast/toast";
import { config } from "config/config";

type AuthState = {
	walletAddress: Nullable<string>;
	isLoggedIn: boolean;
	logIn: () => Promise<void>;
	logOut: () => Promise<void>;
};

const initialAuthState: AuthState = {
	walletAddress: null,
	isLoggedIn: false,
	logIn: async () => {},
	logOut: async () => {},
};

const AuthContext = createContext<AuthState>(initialAuthState);
export const useAuth = () => useContext(AuthContext);

const InnerProvider = ({ children }: { children: ReactNode }) => {
	const { address, connect, disconnect, kit } = useCelo();
	const [walletAddress, setWalletAddress] = useState<AuthState["walletAddress"]>(null);
	const [isLoggedIn, setIsLoggedIn] = useState<AuthState["isLoggedIn"]>(false);

	const loadAuthSummary = async () => {
		setWalletAddress(address);

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
				toast.success("Logged Out");
			})
			.catch((err) => {
				console.error(err);
				toast.error("Failed to disconnect wallet.");
			});
	};

	return (
		<AuthContext.Provider
			value={{
				walletAddress,
				isLoggedIn,
				logIn,
				logOut,
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
