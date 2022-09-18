import { Alfajores, CeloProvider } from "@celo/react-celo";
import type { ReactNode } from "react";
import { InnerProvider } from "./use-account";

export const AccountContextProvider = ({ children }: { children: ReactNode }) => (
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
