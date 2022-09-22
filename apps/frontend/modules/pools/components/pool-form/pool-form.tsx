import { AlertBar } from "@components/alert-bar/alert-bar";
import { useAccount } from "@modules/account/state/use-account";
import { RichTextEditor } from "@modules/create/components/rich-text-editor";
import { useRefoundContracts } from "@modules/refound/hooks/use-refound-contracts";
import type { PoolCreationProperties } from "@modules/refound/models/pool.dto";
import { toast } from "@services/toast/toast";
import { cloin } from "@utils/cloin";
import { stringIsDate } from "@utils/data-helpers/string-is-date";
import type { Result } from "@utils/monads";
import { result } from "@utils/monads";
import type { ChangeEvent, MouseEventHandler } from "react";
import { useReducer } from "react";

type PoolFormFields = {
	title?: string;
	description?: string;
	goalInCUSD?: number;
	imageLink?: string;
	startAt?: string;
	endAt?: string;
};

const initialPoolFormFields: PoolFormFields = {};

type FormState = {
	submissionStatus: "IDLE" | "SUBMITTING" | "SUCCESS" | "ERROR";
	validationStatus: "IDLE" | "SUBMITTING" | "SUCCESS" | "ERROR";
	fieldValues: PoolFormFields;
	validationErrors: string[];
};

const initialFormState: FormState = {
	submissionStatus: "IDLE",
	validationStatus: "IDLE",
	fieldValues: initialPoolFormFields,
	validationErrors: [],
};

type FormReducerActions =
	| { type: "SET_FIELDS"; payload: Partial<PoolFormFields> }
	| { type: "VALIDATION_START" }
	| { type: "VALIDATION_FAIL"; payload: string[] }
	| { type: "VALIDATION_SUCCESS" }
	| { type: "SUBMISSION_START" }
	| { type: "SUBMISSION_FAIL" }
	| { type: "SUBMISSION_SUCCESS" };

const formReducer = (state: FormState, action: FormReducerActions): FormState => {
	console.log({ state, action });
	switch (action.type) {
		case "SET_FIELDS":
			return {
				...state,
				fieldValues: {
					...state.fieldValues,
					...action.payload,
				},
				validationStatus: "IDLE",
				submissionStatus: "IDLE",
			};
		case "VALIDATION_START":
			return { ...state, validationStatus: "SUBMITTING", validationErrors: [] };
		case "VALIDATION_SUCCESS":
			return { ...state, validationStatus: "SUCCESS", validationErrors: [] };
		case "VALIDATION_FAIL":
			return {
				...state,
				validationStatus: "ERROR",
				submissionStatus: "ERROR",
				validationErrors: action.payload,
			};
		case "SUBMISSION_START":
			return { ...state, submissionStatus: "SUBMITTING", validationStatus: "IDLE" };
		case "SUBMISSION_SUCCESS":
			return { ...initialFormState, submissionStatus: "SUCCESS" };
		case "SUBMISSION_FAIL":
			return { ...state, submissionStatus: "ERROR" };
		default:
			return state;
	}
};

export const PoolForm = () => {
	const [state, dispatch] = useReducer(formReducer, initialFormState);
	const { createPool } = useRefoundContracts();
	const { account } = useAccount();

	const handleFieldChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		console.log(e.target);
		console.log({ [e.target.name]: e.target.value });
		dispatch({ type: "SET_FIELDS", payload: { [e.target.name]: e.target.value } });
	};

	const validateForm = (): Result<PoolCreationProperties> => {
		dispatch({ type: "VALIDATION_START" });

		// TODO: validate duration. Must start after current block timestamp, end after max duration. Currently max duration is only 10_000s
		try {
			const goal = state.fieldValues.goalInCUSD;
			if (!goal) throw Error("Goal is required.");

			const title = state.fieldValues.title;
			if (!title || !title.trim()) throw Error("Title is missing.");
			if (title.length < 5 || title.length > 70)
				throw Error("Title must be between 5 and 70 characters.");
			const formattedTitle = title.trim();

			const startAt = state.fieldValues.startAt;
			if (!startAt || !stringIsDate(startAt)) throw Error("Start date is invalid.");
			const startAtDate = new Date(startAt);

			const endAt = state.fieldValues.endAt;
			if (!endAt || !stringIsDate(endAt)) throw Error("End date is invalid.");
			const endAtDate = new Date(endAt);

			const creationProps: PoolCreationProperties = {
				goal,
				title: formattedTitle,
				description: state.fieldValues.description,
				imageLink: state.fieldValues.imageLink,
				startAt: startAtDate,
				endAt: endAtDate,
			};

			dispatch({ type: "VALIDATION_SUCCESS" });
			return result.ok(creationProps);
		} catch (err) {
			dispatch({ type: "VALIDATION_FAIL", payload: [(err as Error).message] });
			return result.fail(err as Error);
		}
	};

	const handleSubmit: MouseEventHandler = (e) => {
		e.preventDefault();
		e.stopPropagation();

		dispatch({ type: "SUBMISSION_START" });

		validateForm().match({
			ok: async (validData) => {
				(await createPool(validData)).match({
					ok: () => {
						toast.success("Pool created!");
						dispatch({ type: "SUBMISSION_SUCCESS" });
					},
					fail: (err) => {
						console.error(err);
						toast.error("Submission failed.");
						dispatch({ type: "SUBMISSION_FAIL" });
					},
				});
			},
			fail: () => {
				toast.error("Submission failed.");
				dispatch({ type: "SUBMISSION_FAIL" });
			},
		});
	};

	return (
		<form className="flex flex-col w-full max-w-screen-md mx-auto">
			<div className="form-control">
				<label htmlFor="title" className="font-bold label label-text">
					Pool Title*
				</label>
				<input
					type="text"
					name="title"
					className="w-full input input-bordered"
					value={state.fieldValues.title}
					required
					onChange={handleFieldChange}
				/>
			</div>

			<div className="form-control">
				<label className="font-bold label label-text">Description*</label>
				<RichTextEditor
					onChange={(htmlString) => {
						dispatch({ type: "SET_FIELDS", payload: { description: htmlString } });
					}}
				/>
			</div>

			<div className="form-control">
				<label htmlFor="imageLink" className="font-bold label label-text">
					Cover Image Link
				</label>
				<input
					name="imageLink"
					type="url"
					className="w-full input input-bordered"
					value={state.fieldValues.imageLink}
					onChange={handleFieldChange}
				/>
			</div>

			<div className="form-control">
				<label htmlFor="goalInCUSD" className="font-bold label label-text">
					Goal (in cUSD)*
				</label>
				<input
					name="goalInCUSD"
					className="w-full input input-bordered"
					type="number"
					min="1"
					max="1000000"
					value={state.fieldValues.goalInCUSD}
					required
					onChange={handleFieldChange}
				/>
			</div>

			<div className="form-control">
				<label htmlFor="startAt" className="font-bold label label-text">
					Start Date*
				</label>
				<input
					name="startAt"
					type="date"
					className="w-full input input-bordered"
					value={state.fieldValues.startAt}
					required
					onChange={handleFieldChange}
				/>
			</div>

			<div className="form-control">
				<label htmlFor="endAt" className="font-bold label label-text">
					End Date*
				</label>
				<input
					name="endAt"
					type="date"
					className="w-full input input-bordered"
					value={state.fieldValues.endAt}
					required
					onChange={handleFieldChange}
				/>
			</div>

			<div className="flex flex-col gap-4 mt-8">
				{!account.address && (
					<AlertBar kind="warning">
						Please{" "}
						<a className="link" href="/sign-up">
							sign in
						</a>{" "}
						to create a post.
					</AlertBar>
				)}

				<button
					type="submit"
					className={cloin(
						"justify-start btn btn-block",
						state.submissionStatus === "SUBMITTING" && "loading btn-disabled",
						state.submissionStatus === "SUCCESS" && "btn-success pointer-events-none",
						state.submissionStatus === "ERROR" && "btn-error pointer-events-none",
					)}
					disabled={!account.address}
					onClick={handleSubmit}
				>
					{state.submissionStatus === "SUCCESS" ? "Created!" : "Create Pool"}
				</button>

				{state.validationErrors.length > 0 && (
					<div className="flex flex-col gap-2">
						{" "}
						{state.validationErrors.map((err) => (
							<span key={err} className="text-sm text-error">
								{err}
							</span>
						))}
					</div>
				)}
			</div>
		</form>
	);
};
