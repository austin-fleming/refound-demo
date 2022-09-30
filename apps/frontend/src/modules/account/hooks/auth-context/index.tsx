import { Alfajores, useCelo } from "@celo/react-celo";
import type { Nullable } from "@repo/common/utils/helper-types";
import { toast } from "@services/toast/toast";
import { useRouter } from "next/router";
import type { ReactNode } from "react";
import { useEffect } from "react";
import { createContext, useContext, useMemo } from "react";
import { useReducer } from "react";
import { useCallback } from "react";

export type State = {
	address: Nullable<string>;
	login: () => Promise<void>;
	logout: () => Promise<void>;
	status: "DISCONNECTED" | "CONNECTING" | "CONNECTED";
};

export const initialState: State = {
	address: undefined,
	login: async () => {
		console.warn("login not initialize");
	},
	logout: async () => {
		console.warn("logout not initialized");
	},
	status: "DISCONNECTED",
};

type Action =
	| {
			type: "REQUEST_LOGIN";
	  }
	| {
			type: "LOGIN_SUCCESS";
			payload: State["address"];
	  }
	| {
			type: "LOGIN_FAIL";
	  }
	| {
			type: "LOGOUT";
	  };

const reducer = (state: State, action: Action): State => {
	switch (action.type) {
		case "REQUEST_LOGIN":
			return { ...state, status: "CONNECTING" };
		case "LOGIN_SUCCESS":
			return { ...state, status: "CONNECTED", address: action.payload };
		case "LOGIN_FAIL":
			return { ...state, status: "DISCONNECTED", address: undefined };
		case "LOGOUT":
			return initialState;
		default: {
			console.warn(`Unknown action type: "${action}"`);
			return state;
		}
	}
};

const AuthContext = createContext<State>(initialState);
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
	const router = useRouter();
	const { connect, disconnect, address, updateNetwork } = useCelo();
	const [state, dispatch] = useReducer(reducer, initialState);

	const login = useCallback(async () => {
		if (address && state.status === "CONNECTED") return;

		if (address && state.status !== "CONNECTED") {
			dispatch({ type: "LOGIN_SUCCESS", payload: address });
			return;
		}

		dispatch({ type: "REQUEST_LOGIN" });

		try {
			await updateNetwork(Alfajores);
			await connect();
			dispatch({ type: "LOGIN_SUCCESS", payload: address });
		} catch (err) {
			console.error(err);
			toast.warning("Could not log in. This could be because you cancelled the process.");
			dispatch({ type: "LOGIN_FAIL" });
		}
	}, [address, state.status]);

	const logout = useCallback(async () => {
		if (state.status === "DISCONNECTED") return;

		await disconnect();
		toast.message("Logged Out");
		dispatch({ type: "LOGOUT" });
		router.push("/");
	}, [address, state.status]);

	useEffect(() => {
		if (address) login();
	}, [address]);

	const value = useMemo(
		() => ({
			address,
			status: state.status,
			login,
			logout,
		}),
		[address, login, logout, state.status],
	);

	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
