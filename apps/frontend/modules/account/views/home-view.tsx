import { PolyButton } from "@components/poly-button/poly-button";
import { useAuth } from "@modules/auth/hooks/use-auth";
import { useRefound } from "@modules/refound/hooks/use-refound/use-refound";
import type { NextPage } from "next";

export const HomeView: NextPage = () => {
	const { logIn, logOut, walletAddress, isLoggedIn } = useAuth();
	const { queries, commands } = useRefound();

	return (
		<section>
			<h1>Home</h1>
			<PolyButton
				label={isLoggedIn ? "disconnect" : "connect"}
				as="button"
				onClick={isLoggedIn ? logOut : logIn}
			/>
			<div>Address: {walletAddress || "-"}</div>
		</section>
	);
};
