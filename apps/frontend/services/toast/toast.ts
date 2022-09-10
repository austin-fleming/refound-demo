import HotToast from "react-hot-toast";

interface IToast {
	message: (message: string) => void;
	success: (message: string) => void;
	warning: (message: string) => void;
	error: (message: string) => void;
}

export const toast: IToast = {
	message: (message: string) => {
		HotToast(message);
	},
	success: (message: string) => {
		HotToast.success(message);
	},
	warning: (message: string) => {
		HotToast(`Warning: ${message}`);
	},
	error: (message: string) => {
		HotToast.error(message);
	},
};
