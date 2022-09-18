import type { Profile } from "@modules/refound/models/profile.model";

type ConnectionStatus = "NOT_CONNECTED" | "CONNECTING" | "CONNECTED";

export type State = {
	address?: string;
	status: ConnectionStatus;
	hasProfile: boolean;
	profile?: Profile;
};

export const initialState: State = {
	address: undefined,
	status: "NOT_CONNECTED",
	hasProfile: false,
	profile: undefined,
};

type Action =
	| {
			type: "REQUEST_LOGIN";
	  }
	| {
			type: "LOGIN_SUCCESS_NEW_ACCOUNT";
			payload: {
				address: string;
			};
	  }
	| {
			type: "LOGIN_SUCCESS_EXISTING_ACCOUNT";
			payload: {
				address: string;
				profile: Profile;
			};
	  }
	| {
			type: "COMPLETE_REGISTRATION";
			payload: Profile;
	  }
	| {
			type: "LOGIN_FAIL";
	  }
	| {
			type: "LOGOUT";
	  };

export const reducer = (state: State, action: Action): State => {
	switch (action.type) {
		case "REQUEST_LOGIN":
			return { ...state, status: "CONNECTING" };
		case "LOGIN_SUCCESS_NEW_ACCOUNT":
			return { ...state, status: "CONNECTED", hasProfile: false, ...action.payload };
		case "LOGIN_SUCCESS_EXISTING_ACCOUNT":
			return { ...state, status: "CONNECTED", hasProfile: true, ...action.payload };
		case "COMPLETE_REGISTRATION":
			return { ...state, status: "CONNECTED", hasProfile: true, profile: action.payload };
		case "LOGIN_FAIL":
			return initialState;
		case "LOGOUT":
			return initialState;
		default: {
			console.error(`Unknown action type: "${action}"`);
			return state;
		}
	}
};
