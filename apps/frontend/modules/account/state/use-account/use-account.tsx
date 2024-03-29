import { Alfajores, useCelo } from "@celo/react-celo";
import type { Profile } from "@modules/refound/models/profile.model";
import { toast } from "@services/toast/toast";
import axios from "axios";
import { useRouter } from "next/router";
import type { ReactNode } from "react";
import { useCallback } from "react";
import { useEffect } from "react";
import { useContext } from "react";
import { createContext, useReducer } from "react";
import type { ConnectionStatus, State } from "./reducer";
import { initialState, reducer } from "./reducer";

interface IUseAccount {
	account: State;
	login: () => Promise<void>;
	logout: () => Promise<void>;
	completeRegistration: () => Promise<void>;
}

const initialAccountState: IUseAccount = {
	account: initialState,
	login: async () => {},
	logout: async () => {},
	completeRegistration: async () => {},
};

const AccountContext = createContext<IUseAccount>(initialAccountState);
export const useAccount = () => useContext(AccountContext);

export const InnerProvider = ({ children }: { children: ReactNode }) => {
	const router = useRouter();
	const { connect, disconnect, address, initialised, updateNetwork } = useCelo();
	const [account, dispatch] = useReducer(reducer, initialState);

	const fetchProfile = useCallback(
		async () =>
			axios
				.get<Profile>(`/api/users/account/${address}?requester=${address}`)
				.then((response) => response.data),
		[address],
	);

	const loadProfile = useCallback(async () => {
		try {
			if (!address) {
				return;
			}

			return await fetchProfile()
				.then((profile) => {
					dispatch({
						type: "LOGIN_SUCCESS_EXISTING_ACCOUNT",
						payload: {
							address,
							profile,
						},
					});
				})
				.catch((err) => {
					console.error(err);
					dispatch({
						type: "LOGIN_SUCCESS_NEW_ACCOUNT",
						payload: {
							address,
						},
					});
				});
		} catch (err) {
			console.error(err);
			toast.error("Connection lost.");
			await disconnect();
			dispatch({ type: "LOGIN_FAIL" });
		}
	}, [address, disconnect, connect]);

	const login = useCallback(async () => {
		if (account.status === "CONNECTED") return;

		dispatch({ type: "REQUEST_LOGIN" });
		try {
			await updateNetwork(Alfajores);
			await connect();
			await loadProfile();
		} catch (err) {
			console.error(err);
			toast.error("Could not log in. This could be because you cancelled the process.");
			dispatch({ type: "LOGIN_FAIL" });
		}
	}, [address, account.status, connect, disconnect, fetchProfile]);

	const completeRegistration = async () => {
		try {
			if (!address || account.status !== "CONNECTED") {
				toast.error("Please log in to complete registration");
				throw new Error("Could not complete registration. Not logged in.");
			}

			await fetchProfile()
				.then((profile) => {
					toast.success("Registration completed!");
					dispatch({ type: "COMPLETE_REGISTRATION", payload: profile });
					router.push("/discover");
				})
				.catch((err) => {
					console.error(err);
					toast.error("Could not find profile");
				});
		} catch (err) {
			console.error(err);
			toast.error("Could not load profile");
		}
	};

	const logout = async () => {
		if (account.status === "NOT_CONNECTED") return;

		await disconnect();
		toast.message("Logged out");
		dispatch({ type: "LOGOUT" });
		router.push("/");
	};

	useEffect(() => {
		if (address) {
			loadProfile();
		}
	}, [address, initialised]);

	useEffect(() => {
		if (account.status === "CONNECTED" && account.hasProfile !== true) {
			router.push("/sign-up");
		}
	}, [account.status, account.hasProfile]);

	return (
		<AccountContext.Provider value={{ login, logout, account, completeRegistration }}>
			{children}
		</AccountContext.Provider>
	);
};
