import type { Account } from "@modules/mocks/account";
import { accountService } from "@modules/mocks/account.api";
import { useAuth } from "@modules/auth/hooks/use-auth";
import { toast } from "@services/toast/toast";
import type { Nullable } from "@utils/monads";
import { useRouter } from "next/router";
import { createContext, type ReactNode, useContext, useState, useEffect, useCallback } from "react";

type AccountState = {
	username: Nullable<Account["username"]>;
	avatarUrl: Nullable<Account["avatarUrl"]>;
	status: Nullable<Account["status"]>;
	slug: Nullable<Account["slug"]>;
	bio: Nullable<Account["bio"]>;
	// methods
	loadAccount: () => Promise<void>;
};

const initialAccountState: AccountState = {
	username: null,
	avatarUrl: null,
	status: null,
	slug: null,
	bio: null,
	loadAccount: async () => {},
};

const AccountContext = createContext<AccountState>(initialAccountState);
export const useAccount = () => useContext(AccountContext);

export const AccountContextProvider = ({ children }: { children: ReactNode }) => {
	const router = useRouter();

	const [username, setUsername] = useState<AccountState["username"]>(
		initialAccountState.username,
	);
	const [avatarUrl, setAvatarUrl] = useState<AccountState["avatarUrl"]>(
		initialAccountState.avatarUrl,
	);
	const [status, setStatus] = useState<AccountState["status"]>(initialAccountState.status);
	const [slug, setSlug] = useState<AccountState["slug"]>(initialAccountState.slug);
	const [bio, setBio] = useState<AccountState["bio"]>(initialAccountState.bio);

	const { walletAddress, isLoggedIn } = useAuth();

	const loadAccount = async () => {
		if (!isLoggedIn || !walletAddress) return;

		(await accountService.getAccount(walletAddress)).match({
			ok: (maybeAccount) =>
				maybeAccount.match({
					some: (account) => {
						setUsername(account.username);
						setAvatarUrl(account.avatarUrl);
						setStatus(account.status);
						setSlug(account.slug);
						setBio(account.bio);
					},
					none: () => {
						router.push("/sign-up");
					},
				}),
			fail: (err) => {
				console.error(err);
				toast.error("Failed to load account.");
			},
		});
	};

	useEffect(() => {
		if (!isLoggedIn || !walletAddress) return;

		console.log(walletAddress);
		loadAccount();
	}, [isLoggedIn, walletAddress]);

	return (
		<AccountContext.Provider
			value={{
				username,
				avatarUrl,
				status,
				slug,
				bio,
				loadAccount,
			}}
		>
			{children}
		</AccountContext.Provider>
	);
};
