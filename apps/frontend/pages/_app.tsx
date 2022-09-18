import "@styles/globals.css";
import "@styles/overrides.css";
import "@celo/react-celo/lib/styles.css";
import type { AppProps } from "next/app";
import { Layout } from "@modules/layout/components/layout";
import { Toaster } from "react-hot-toast";
import { AccountContextProvider } from "@modules/account/state/use-account";

function MyApp({ Component, pageProps }: AppProps) {
	return (
		<AccountContextProvider>
			<Layout>
				<Component {...pageProps} />
				<Toaster position="bottom-right" />
			</Layout>
		</AccountContextProvider>
	);
}

export default MyApp;
