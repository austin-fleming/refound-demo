import { useCelo, Alfajores } from "@celo/react-celo";
import { PolyButton } from "@components/poly-button/poly-button";
import { useAuth } from "@modules/auth/hooks/use-auth";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export const HomePage = () => {
	const { logIn, logOut, walletAddress, isLoggedIn } = useAuth();

	return (
		<section>
			<h1>Home</h1>
			<div>Is Logged In: {isLoggedIn ? "true" : "false"}</div>
			{walletAddress ? (
				<PolyButton as='button' onClick={logOut} label={'Disconnect'}/>
			) : (
				<PolyButton as='button' onClick={logIn} label='Connect'/>
			)}
		</section>
	);
};
