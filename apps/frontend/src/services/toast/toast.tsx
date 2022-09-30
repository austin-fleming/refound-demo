import { DismissIcon } from "@modules/ui/icons/menu-icons";
import HotToast from "react-hot-toast";

interface IToast {
	message: (message: string, id?: string) => void;
	success: (message: string, id?: string) => void;
	warning: (message: string, id?: string) => void;
	error: (message: string, id?: string) => void;
}

const InfoToast = (message: string, id?: string) =>
	HotToast.custom(
		(t) => (
			<div className="relative flex flex-row justify-between w-full max-w-screen-sm text-white bg-black border-2 border-white border-solid shadow-lg alert">
				<span className="absolute top-0 bottom-0 right-0 h-full bg-[#333] animate-toastProgress" />
				<div className="relative flex flex-row gap-2">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						className="flex-shrink-0 w-6 h-6 stroke-current"
						fill="none"
						viewBox="0 0 24 24"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth="2"
							d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
						/>
					</svg>
					<span>{message}</span>
				</div>

				<button
					type="button"
					aria-label="dismiss"
					className="relative tracking-wider text-white btn btn-sm btn-link"
					onClick={() => HotToast.remove(t.id)}
				>
					Close
				</button>
			</div>
		),
		{
			id,
			duration: 5000,
		},
	);

const SuccessToast = (message: string, id?: string) =>
	HotToast.custom(
		(t) => (
			<div className="relative flex flex-row justify-between w-full max-w-screen-sm border-2 border-solid shadow-lg bg-success border-success-content alert alert-success">
				<span className="absolute top-0 bottom-0 right-0 h-full bg-green-600 animate-toastProgress" />
				<div className="relative flex flex-row gap-2">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						className="flex-shrink-0 w-6 h-6 stroke-current"
						fill="none"
						viewBox="0 0 24 24"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth="2"
							d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
						/>
					</svg>
					<span>{message}</span>
				</div>

				<button
					type="button"
					aria-label="dismiss"
					className="relative tracking-wider text-white btn btn-sm btn-link"
					onClick={() => HotToast.remove(t.id)}
				>
					Close
				</button>
			</div>
		),
		{
			id,
			duration: 5000,
		},
	);

const WarningToast = (message: string, id?: string) =>
	HotToast.custom(
		(t) => (
			<div className="relative flex flex-row justify-between w-full max-w-screen-sm border-2 border-solid shadow-lg bg-warning border-success-content alert alert-warning">
				<span className="absolute top-0 bottom-0 right-0 h-full bg-orange-700 animate-toastProgress" />
				<div className="relative flex flex-row gap-2">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						className="flex-shrink-0 w-6 h-6 stroke-current"
						fill="none"
						viewBox="0 0 24 24"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth="2"
							d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
						/>
					</svg>
					<span>{message}</span>
				</div>

				<button
					type="button"
					aria-label="dismiss"
					className="relative tracking-wider text-white btn btn-sm btn-link"
					onClick={() => HotToast.remove(t.id)}
				>
					Close
				</button>
			</div>
		),
		{
			id,
			duration: 5000,
		},
	);

const ErrorToast = (message: string, id?: string) =>
	HotToast.custom(
		(t) => (
			<div className="relative flex flex-row justify-between w-full max-w-screen-sm border-2 border-solid shadow-lg border-error-content alert alert-error">
				<span className="absolute top-0 bottom-0 right-0 h-full bg-pink-700 animate-toastProgress" />
				<div className="relative flex flex-row gap-2">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						className="flex-shrink-0 w-6 h-6 stroke-current"
						fill="none"
						viewBox="0 0 24 24"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth="2"
							d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
						/>
					</svg>
					<span>{message}</span>
				</div>

				<button
					type="button"
					aria-label="dismiss"
					className="relative tracking-wider text-white btn btn-sm btn-link"
					onClick={() => HotToast.remove(t.id)}
				>
					Close
				</button>
			</div>
		),
		{
			id,
			duration: 5000,
		},
	);

export const toast: IToast = {
	message: (message: string, id?: string) => {
		InfoToast(message, id);
	},
	success: (message: string, id?: string) => {
		SuccessToast(message, id);
	},
	warning: (message: string, id?: string) => {
		WarningToast(message, id);
	},
	error: (message: string, id?: string) => {
		ErrorToast(message, id);
	},
};
