import {
	Alfajores,
	CeloProvider as CeloContextProvider,
	SupportedProviders,
} from "@celo/react-celo";
import type { ReactNode } from "react";

export const CeloProvider = ({ children }: { children: ReactNode }) => (
	<CeloContextProvider
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
				hideFromDefaults: [
					SupportedProviders.CeloDance,
					SupportedProviders.CeloTerminal,
					SupportedProviders.Steakwallet,
					SupportedProviders.PrivateKey,
					SupportedProviders.Injected,
				],
			},
		}}
	>
		{children}
	</CeloContextProvider>
);
