import { useAccount } from "@modules/account/hooks/use-account";
import { cloin } from "@utils/styling/cloin";
import { Sidebar } from "../sidebar";

export const SiteHeader = () => {
	const { login, logout, status, profile } = useAccount();

	return (
		<header className="fixed top-0 left-0 right-0 flex flex-row items-center justify-between border-b-2 border-solid h-headerTopHeight border-primary z-[5000] bg-white">
			<h1>Refound</h1>

			<div className="flex flex-row items-center">
				<div></div>
				<button
					type="button"
					className={cloin("btn", status === "CONNECTING" && "loading")}
					onClick={() => {
						if (status === "CONNECTED") {
							logout();
							return;
						}

						login();
					}}
				>
					{status === "DISCONNECTED" ? "Sign In" : "Sign Out"}
				</button>
				<Sidebar />
			</div>
		</header>
	);
};
