import { useAccount } from "../state/use-account";

export const AccountPage = () => {
	const { account } = useAccount();

	return (
		<section>
			<h1>Account</h1>
			<div>
				<h2>Address:</h2>
				<p>{account.address || "n/a"}</p>
			</div>
		</section>
	);
};
