import { useAuth } from "../auth-context";
import type { State as AuthState } from "../auth-context";
import { initialState as initialAuthState } from "../auth-context";
import type { ProfileAggregate } from "@api/modules/profile/domain/profile-aggregate";
import type { ReactNode } from "react";
import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { usePublicRefoundQueries } from "@modules/common/hooks/public-refound-context";
import { useRouter } from "next/router";

type State = {
	profile?: ProfileAggregate;
	hasProfile: boolean;
} & AuthState;

const initialState = {
	...initialAuthState,
	profile: undefined,
	hasProfile: false,
};

const AccountContext = createContext<State>(initialState);
export const useAccount = () => useContext(AccountContext);

export const AccountProvider = ({ children }: { children: ReactNode }) => {
	const router = useRouter();
	const { address, login, logout, status } = useAuth();
	const { getProfileByAddress } = usePublicRefoundQueries();
	const [state, setState] = useState<State>(initialState);

	/* useEffect(() => {
        setState({...state, address});
    }, [address, login, logout])
 */
	const loadProfile = useCallback(async () => {
		if (!address) return;

		(await getProfileByAddress(address)).match({
			ok: (profile) => {
				setState({ ...state, profile, hasProfile: true });
			},
			fail: (error) => {
				setState({ ...state, hasProfile: false });
				console.error(error);
				router.push("/sign-up");
			},
		});
	}, [address]);

	useEffect(() => {
		if (address && (!state.hasProfile || !state.profile)) {
			loadProfile();
		}
	}, [address, state.hasProfile, state.profile]);

	const values: State = useMemo(
		() => ({
			address,
			login,
			logout,
			status,
			profile: state.profile,
			hasProfile: state.hasProfile,
		}),
		[address, login, logout, status, state.profile, state.hasProfile],
	);

	return <AccountContext.Provider value={values}>{children}</AccountContext.Provider>;
};
