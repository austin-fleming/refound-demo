import "../styles/globals.css";
import "@celo/react-celo/lib/styles.css";
import type { AppProps } from "next/app";
import { Layout } from "@components/layout/layout";
import { Toaster } from "react-hot-toast";
import { AuthContextProvider } from "@modules/auth/auth.context";

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
