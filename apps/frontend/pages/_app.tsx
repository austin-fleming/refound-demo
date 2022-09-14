import "@styles/globals.css";
import "@styles/overrides.css";
import "@celo/react-celo/lib/styles.css";
import type { AppProps } from "next/app";
import { Layout } from "@modules/layout/components/layout";
import { Toaster } from "react-hot-toast";
import { AuthContextProvider } from "@modules/auth/hooks/use-auth";
import { AccountContextProvider } from "@modules/account/hooks/use-account";

function MyApp({ Component, pageProps }: AppProps) {
	return (
		<AuthContextProvider>
			<AccountContextProvider>
				<Layout>
					<Component {...pageProps} />
					<Toaster position="bottom-right" />
				</Layout>
			</AccountContextProvider>
		</AuthContextProvider>
	);
}

export default MyApp;
