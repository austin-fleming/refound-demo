import type { DragEvent, LegacyRef, MouseEvent } from "react";
import { useReducer, useRef } from "react";
import NextImage from "next/image";

type ReducerState = {
	dropDepth: number;
	inDropZone: boolean;
	file?: File;
	fileWidth?: number;
	fileHeight?: number;
};

const initialReducerState: ReducerState = {
	dropDepth: 0,
	inDropZone: false,
	file: undefined,
	fileWidth: 0,
	fileHeight: 0,
};

type ReducerAction =
	| { type: "SET_DROP_DEPTH"; payload: ReducerState["dropDepth"] }
	| { type: "SET_IN_DROP_ZONE"; payload: ReducerState["inDropZone"] }
	| {
			type: "SET_FILE";
			payload: { file: ReducerState["file"]; fileWidth: number; fileHeight: number };
	  }
	| { type: "RESET" };

const reducer = (state: ReducerState, action: ReducerAction) => {
	switch (action.type) {
		case "SET_DROP_DEPTH":
			return { ...state, dropDepth: action.payload };
		case "SET_IN_DROP_ZONE":
			return { ...state, inDropZone: action.payload };
		case "SET_FILE":
			return { ...state, ...action.payload };
		case "RESET":
			return { ...initialReducerState };
		default:
			return state;
	}
};

const getImageDimensions = (file: File): Promise<{ width: number; height: number }> =>
	new Promise((resolve, reject) => {
		const url = URL.createObjectURL(file);

		const image = new Image();

		image.addEventListener("load", () => {
			console.log({ width: image.width, height: image.height });
			resolve({ width: image.width, height: image.height });
		});

		image.addEventListener("error", (event) => {
			console.error(event.message);
			reject();
		});

		image.src = url;
	});

export const FileDropInput = () => {
	const [state, dispatch] = useReducer(reducer, initialReducerState);
	const inputRef = useRef(null);

	const handleDragEnter = (e: DragEvent<HTMLElement>) => {
		e.preventDefault();
		e.stopPropagation();

		dispatch({ type: "SET_DROP_DEPTH", payload: state.dropDepth + 1 });
	};
	const handleDragLeave = (e: DragEvent<HTMLElement>) => {
		e.preventDefault();
		e.stopPropagation();

		dispatch({ type: "SET_DROP_DEPTH", payload: state.dropDepth - 1 });
		if (state.dropDepth > 0) return;
		dispatch({ type: "SET_IN_DROP_ZONE", payload: false });
	};
	const handleDragOver = (e: DragEvent<HTMLElement>) => {
		e.preventDefault();
		e.stopPropagation();

		e.dataTransfer.dropEffect = "copy";
		dispatch({ type: "SET_IN_DROP_ZONE", payload: true });
	};
	const handleDrop = (e: DragEvent<HTMLElement>) => {
		e.preventDefault();
		e.stopPropagation();

		const files = [...e.dataTransfer.files];
		if (files && files.length > 0) {
			const file = files[0];
			getImageDimensions(file).then((dimensions) => {
				dispatch({
					type: "SET_FILE",
					payload: {
						file: files[0],
						fileWidth: dimensions.width,
						fileHeight: dimensions.height,
					},
				});
				dispatch({ type: "SET_DROP_DEPTH", payload: 0 });
				dispatch({ type: "SET_IN_DROP_ZONE", payload: false });
			});
		}
	};

	const handleClick = (e: MouseEvent<HTMLElement>) => {
		// e.preventDefault();
		//e.stopPropagation();
		console.log("clicked!");
		if (!inputRef?.current) return;
		inputRef.current.click();
	};

	return (
		/* <div className="flex items-center justify-center w-full">
				<label
					htmlFor="dropzone-file"
					className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
				> */
		<div
			onDrop={handleDrop}
			onDragOver={handleDragOver}
			onDragEnter={handleDragEnter}
			onDragLeave={handleDragLeave}
			className={`relative flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100  ${
				state.inDropZone ? "bg-red-600" : ""
			}`}
		>
			<div className="flex flex-col items-center justify-center pt-5 pb-6">
				<div className="flex flex-col items-center justify-center w-full h-full">
					<svg
						aria-hidden="true"
						className="w-10 h-10 mb-3 text-gray-400"
						fill="none"
						stroke="currentColor"
						viewBox="0 0 24 24"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth="2"
							d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
						></path>
					</svg>
					<p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
						<span className="font-semibold">Click to upload</span> or drag and drop
					</p>
					<p className="text-xs text-gray-500 dark:text-gray-400">
						SVG, PNG, JPG or GIF (MAX. 800x400px)
					</p>
					<button
						type="button"
						onClick={(e) => {
							e.preventDefault();
							inputRef.current.click();
						}}
					>
						Upload
					</button>
				</div>
			</div>
			<input
				/* id="dropzone-file" */
				type="file"
				multiple={true}
				/* className="hidden" */
				ref={inputRef}
			/>
			{state.file && (
				<div className="absolute w-full h-full">
					<NextImage
						src={URL.createObjectURL(state.file)}
						width={1000}
						height={1000}
						layout="intrinsic"
						alt="image preview"
						onLoad={({ target: image }) => {
							const { offsetHeight, offsetWidth } = image;
							console.log({ offsetHeight, offsetWidth });
						}}
					/>
				</div>
			)}
		</div>
		/* </label>
			</div> */
	);
};
