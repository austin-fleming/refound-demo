import "../styles/globals.css";
import "@celo/react-celo/lib/styles.css";
import type { AppProps } from "next/app";
import { Layout } from "@modules/layout/components/layout";
import { Toaster } from "react-hot-toast";
import { AuthContextProvider } from "@modules/auth/hooks/use-auth";
import { SignUpGuard } from "@modules/auth/hooks/sign-up-guard";

function MyApp({ Component, pageProps }: AppProps) {
	return (
		<AuthContextProvider>
			<Layout>
				<SignUpGuard>
				<Component {...pageProps} />
				</SignUpGuard>
				<Toaster position="bottom-right" />
			</Layout>
		</AuthContextProvider>
	);
}

export default MyApp;
