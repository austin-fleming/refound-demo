import { useAuth } from "@modules/auth/auth.context";
import { useLayout } from "./layout-provider";

const Menu = () => {
	const { walletAddress, isLoggedIn, logIn, logOut } = useAuth();

	return isLoggedIn ? (
		<>
			<h2>Account</h2>
			<p>{walletAddress || ""}</p>

			<button onClick={logOut}>Log Out</button>

			<section>
				<button
					onClick={() => {
						window.alert("SOS!");
					}}
				>
					SOS
				</button>

				<h3 className="mt-4 text-sm font-bold">General</h3>
				<ul className="flex flex-col gap-2">
					<li>Notifications</li>
					<li>Saved</li>
				</ul>
				<h3 className="mt-4 text-sm font-bold">Funds</h3>
				<ul className="flex flex-col gap-2">
					<li>Balances</li>
					<li>Withdraw</li>
					<li>Manage Royalties</li>
					<li>Manage Beneficieries</li>
					<li>Manage Subscribers</li>
				</ul>
				<h3 className="mt-4 text-sm font-bold">Settings</h3>
				<ul className="flex flex-col gap-2">
					<li>Profile</li>
					<li>Notifications</li>
					<li>Identity</li>
					<li>Privacy</li>
				</ul>
			</section>
		</>
	) : (
		<button onClick={logIn}>Log In</button>
	);
};

export const SideMenu = () => {
	const { menuIsOpen, toggleMenu } = useLayout();

	return (
		<aside
			className={`w-full p-contentPadding max-w-xs bg-white h-full fixed top-0 right-0 z-[8000] transition-transform duration-150 ${
				menuIsOpen ? "translate-x-0 shadow-2xl" : "translate-x-full"
			}`}
		>
			<button
				onClick={toggleMenu}
				className="absolute top-contentPadding right-contentPadding"
			>
				Close
			</button>
			<Menu />
		</aside>
	);
};
