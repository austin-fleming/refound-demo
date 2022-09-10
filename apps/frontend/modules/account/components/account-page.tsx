import { useAuth } from "@modules/auth/hooks/use-auth";

export const AccountPage = () => {
	const { isLoggedIn, walletAddress } = useAuth();

	return (
		<section>
			<h1>Account</h1>
			<div>
				<h2>Address:</h2>
				<p>{walletAddress || "n/a"}</p>
			</div>
		</section>
	);
};
