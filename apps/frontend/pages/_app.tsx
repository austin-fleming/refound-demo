import "@styles/globals.css";
import "@styles/overrides.css";
import "@celo/react-celo/lib/styles.css";
import type { AppProps } from "next/app";
import { Layout } from "@modules/layout/components/layout";
import { Toaster } from "react-hot-toast";
import { AuthContextProvider } from "@modules/refound/hooks/use-auth";

function MyApp({ Component, pageProps }: AppProps) {
	return (
		<AuthContextProvider>
			<Layout>
				<Component {...pageProps} />
				<Toaster position="bottom-right" />
			</Layout>
		</AuthContextProvider>
	);
}

export default MyApp;
