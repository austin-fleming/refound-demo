import { PolyButton } from "@components/poly-button/poly-button";
import { useRefoundContracts } from "@modules/refound/hooks/use-refound-contracts";
import type { ImagePostCreationProps } from "@modules/refound/models/post.dto";
import { toast } from "@services/toast/toast";
import { isString } from "@utils/data-helpers/is-string";
import type { Result } from "@utils/monads";
import { result } from "@utils/monads";
import { useRouter } from "next/router";
import type { MouseEventHandler } from "react";
import { useReducer } from "react";
import { TagInput } from "./tag-input";
import S from "./image-post-form.module.css";
import { FileDropInput } from "../form-inputs/file-drop-input";
import { cloin } from "@utils/cloin";

type FormData = {
	title?: string;
	image?: File;
	width?: number;
	height?: number;
	description?: string;
	location?: string;
	tags?: string[];
};

type ReducerState = {
	validationStatus: "IDLE" | "VALIDATING" | "SUCCESS" | "FAIL";
	submissionStatus: "IDLE" | "SUBMITTING" | "SUCCESS" | "FAIL";
	validationErrors: string[];
} & FormData;

const initialReducerState: ReducerState = {
	title: "",
	image: undefined,
	width: 0,
	height: 0,
	description: "",
	location: "",
	tags: [],
	validationStatus: "IDLE",
	submissionStatus: "IDLE",
	validationErrors: [],
};

type ReducerActions =
	| { type: "SET_TITLE"; payload: FormData["title"] }
	| {
			type: "SET_IMAGE";
			payload: {
				image?: FormData["image"];
				width?: FormData["width"];
				height?: FormData["height"];
			};
	  }
	| { type: "SET_DESCRIPTION"; payload: FormData["description"] }
	| { type: "SET_LOCATION"; payload: FormData["location"] }
	| { type: "SET_TAGS"; payload: FormData["tags"] }
	| { type: "SUBMIT_START" }
	| { type: "VALIDATION_START" }
	| { type: "VALIDATION_PASS" }
	| { type: "VALIDATION_FAIL"; payload: string[] }
	| { type: "SUBMIT_SUCCESS" }
	| { type: "SUBMIT_FAIL" }
	| { type: "RESET" };

const reducer = (state: ReducerState, action: ReducerActions): ReducerState => {
	switch (action.type) {
		case "SET_TITLE":
			return {
				...state,
				title: action.payload,
				validationStatus: "IDLE",
				submissionStatus: "IDLE",
			};
		case "SET_IMAGE":
			return {
				...state,
				...action.payload,
				validationStatus: "IDLE",
				submissionStatus: "IDLE",
			};
		case "SET_DESCRIPTION":
			return {
				...state,
				description: action.payload,
				validationStatus: "IDLE",
				submissionStatus: "IDLE",
			};
		case "SET_LOCATION":
			return {
				...state,
				location: action.payload,
				validationStatus: "IDLE",
				submissionStatus: "IDLE",
			};
		case "SET_TAGS":
			return {
				...state,
				tags: action.payload,
				validationStatus: "IDLE",
				submissionStatus: "IDLE",
			};
		case "SUBMIT_START":
			return {
				...state,
				submissionStatus: "SUBMITTING",
				validationStatus: "IDLE",
				validationErrors: [],
			};
		case "VALIDATION_START":
			return { ...state, validationStatus: "VALIDATING", validationErrors: [] };
		case "SUBMIT_FAIL":
			return { ...state, submissionStatus: "FAIL" };
		case "SUBMIT_SUCCESS":
			return { ...state, submissionStatus: "SUCCESS", validationErrors: [] };
		case "VALIDATION_PASS":
			return { ...state, validationStatus: "SUCCESS", validationErrors: [] };
		case "VALIDATION_FAIL":
			return {
				...state,
				submissionStatus: "FAIL",
				validationStatus: "FAIL",
				validationErrors: action.payload,
			};
		case "RESET":
			return initialReducerState;
		default:
			return state;
	}
};

export const ImagePostForm = () => {
	const router = useRouter();
	const [state, dispatch] = useReducer(reducer, initialReducerState);
	const { createImagePost } = useRefoundContracts();

	const validateForm = async (): Promise<
		Result<{ image: File; metadata: ImagePostCreationProps }>
	> => {
		dispatch({ type: "VALIDATION_START" });
		try {
			const { title, image, description, width, height, tags, location } = state;

			if (!title?.trim() || !isString(title)) throw new Error("Title is missing.");
			if (title.length < 10) throw new Error("Title is too short.");

			if (!image?.name || image.size === 0) throw new Error("File is missing.");

			if (!width) throw new Error("Image width is missing.");
			if (!height) throw new Error("Image height is missing.");

			const creationProps: ImagePostCreationProps = {
				title: title.trim(),
				width,
				height,
				description,
				tags: tags ? tags.map((tag) => tag.toLowerCase()) : [],
				location: location?.trim(),
			};

			dispatch({ type: "VALIDATION_PASS" });
			return result.ok({ image: image, metadata: creationProps });
		} catch (err) {
			dispatch({ type: "VALIDATION_FAIL", payload: [(err as Error).message] });
			return result.fail(err as Error);
		}
	};

	const createPost = async (): Promise<Result<true>> => {
		try {
			dispatch({ type: "SUBMIT_START" });

			const creationProps = (await validateForm()).unwrapOrElse((err) => {
				throw err;
			});

			(await createImagePost(creationProps.image, creationProps.metadata)).unwrapOrElse(
				(err) => {
					throw err;
				},
			);

			dispatch({ type: "SUBMIT_SUCCESS" });
			return result.ok(true);
		} catch (err) {
			console.error(err);
			dispatch({ type: "SUBMIT_FAIL" });
			return result.fail(new Error("Failed to create post."));
		}
	};

	const onSubmit: MouseEventHandler<HTMLButtonElement> = (e) => {
		e.preventDefault();

		createPost().then((confirmation) =>
			confirmation.match({
				ok: () => {
					toast.success("Post created!");
					router.push("/account");
				},
				fail: () => {
					toast.error("Failed to create post.");
				},
			}),
		);
	};

	return (
		<form className={S.formRoot}>
			<label className={S.fieldLabel}>
				<span className={S.fieldLabelText}>Title*</span>
				<input
					className={S.fieldInput}
					name="title"
					type="text"
					placeholder="Title"
					onChange={(e) => {
						dispatch({ type: "SET_TITLE", payload: e.target.value });
					}}
				/>
			</label>

			<label className={S.fieldLabel}>
				<span className={S.fieldLabelText}>Image*</span>
				<FileDropInput
					setProps={(imageData) => {
						dispatch({ type: "SET_IMAGE", payload: imageData });
					}}
				/>
			</label>

			<label className={S.fieldLabel}>
				<span className={S.fieldLabelText}>Tags</span>
				<TagInput
					name="tags"
					onChange={(values) => {
						dispatch({ type: "SET_TAGS", payload: values });
					}}
				/>
			</label>

			<label className={S.fieldLabel}>
				<span className={S.fieldLabelText}>Description</span>
				<input
					className={S.fieldInput}
					name="description"
					type="text"
					placeholder="A brief description"
					onChange={(e) => {
						dispatch({ type: "SET_DESCRIPTION", payload: e.target.value });
					}}
				/>
			</label>

			<label className={S.fieldLabel}>
				<span className={S.fieldLabelText}>Location</span>
				<input
					className={S.fieldInput}
					name="location"
					type="text"
					onChange={(e) => {
						dispatch({ type: "SET_LOCATION", payload: e.target.value });
					}}
					placeholder="Where is this about?"
				/>
			</label>

			<button
				className={cloin(
					"btn w-full",
					state.submissionStatus === "SUBMITTING" && "loading",
					state.submissionStatus === "SUCCESS" && "btn-success",
					state.submissionStatus === "FAIL" && "btn-error",
				)}
				disabled={state.submissionStatus !== "IDLE"}
				onClick={onSubmit}
			>
				Submit
			</button>
			{state.validationErrors.length > 0 && (
				<div className="flex flex-col gap-2 text-sm text-red-900">
					{" "}
					{state.validationErrors.map((errorText) => (
						<p key={errorText}>{errorText}</p>
					))}
				</div>
			)}
		</form>
	);
};
