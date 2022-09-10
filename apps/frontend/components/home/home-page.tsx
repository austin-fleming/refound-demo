import { useCelo, Alfajores } from "@celo/react-celo";
import { useAuth } from "@modules/auth/auth.context";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export const HomePage = () => {
	const { logIn, logOut, walletAddress, isLoggedIn } = useAuth();

	return (
		<section>
			<h1>Home</h1>
			<div>Is Logged In: {isLoggedIn ? "true" : "false"}</div>
			{walletAddress ? (
				<button onClick={logOut}>Disconnect</button>
			) : (
				<button onClick={logIn}>Connect</button>
			)}
		</section>
	);
};
