import { useAccount } from "@modules/account/hooks/use-account";
import { cloin } from "@utils/styling/cloin";

type ButtonSizes = "sm" | "base" | "lg";
const buttonSizeClasses: Record<ButtonSizes, string> = {
	sm: "btn-sm",
	base: "btn-md",
	lg: "btn-lg",
};

export const SignInButton = ({
	signInLabel = "Sign In",
	wide = false,
	size = "base",
	className = "",
}: {
	signInLabel?: string;
	wide?: boolean;
	size?: ButtonSizes;
	className?: string;
}) => {
	const { login, logout, status } = useAccount();

	return (
		<button
			type="button"
			className={cloin(
				"btn hover:btn-ghost",
				status === "CONNECTING" && "loading pointer-events-none",
				buttonSizeClasses[`${size}`],
				wide && "btn-wide",
				className,
			)}
			onClick={() => {
				if (status === "CONNECTED") {
					logout();
					return;
				}

				login();
			}}
		>
			{status === "CONNECTED" ? "Sign Out" : signInLabel}
		</button>
	);
};
