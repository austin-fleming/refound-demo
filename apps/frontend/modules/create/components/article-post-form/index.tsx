import { PolyButton } from "@components/poly-button/poly-button";
import { useRefoundContracts } from "@modules/refound/hooks/use-refound-contracts";
import type { ArticlePostCreationProps } from "@modules/refound/models/post.dto";
import type { PostId } from "@modules/refound/models/post.model";
import { PostType } from "@modules/refound/models/post.model";
import { toast } from "@services/toast/toast";
import { isString } from "@utils/data-helpers/is-string";
import type { Result } from "@utils/monads";
import { result } from "@utils/monads";
import { useRouter } from "next/router";
import type { ChangeEvent, MouseEventHandler } from "react";
import { useState } from "react";
import { RichTextEditor } from "../rich-text-editor";
import { TagInput } from "./tag-input";
import S from "./article-post-form.module.css";

type FormState = {
	title?: string;
	coverImageLink?: string; // url
	tags?: string[];
	location?: string;
};

export const ArticlePostForm = () => {
	const router = useRouter();
	const [formData, setFormData] = useState<FormState>({});
	const [bodyData, setBodyData] = useState<string>("");
	const [validationStatus, setValidationStatus] = useState<
		"IDLE" | "VALIDATING" | "PASSED" | "FAILED"
	>("IDLE");
	const [validationErrors, setValidationErrors] = useState<string[]>([]);
	const [submissionStatus, setSubmissionStatus] = useState<
		"IDLE" | "SUBMITTING" | "SUCCESS" | "FAIL"
	>("IDLE");
	const { getPost, createArticlePost } = useRefoundContracts();

	const getPostIdFromImage = async (imageUrl: string): Promise<PostId> => {
		if (
			!imageUrl.startsWith("https://refound.app/posts/") ||
			!imageUrl.startsWith("http://refound.app/posts/")
		)
			throw new Error("Images must be refound a refound post link");

		const urlfragments = imageUrl.split("/");
		const maybePostId = Number.parseInt(urlfragments[urlfragments.length - 1]);

		if (Number.isNaN(maybePostId)) throw new Error("Image ");

		const maybePost = (await getPost(maybePostId)).unwrapOrElse((err) => {
			throw new Error(`Could not find the image: ${imageUrl}`);
		});

		if (maybePost?.postType !== PostType.IMAGE)
			throw new Error(`The post at "${imageUrl}" is not an image post.`);

		return maybePost.postId;
	};

	const validateForm = async (formData: FormState): Promise<Result<ArticlePostCreationProps>> => {
		setValidationStatus("VALIDATING");
		setValidationErrors([]);
		try {
			const { title, coverImageLink, tags, location } = formData;
			const body = bodyData;

			if (!title?.trim() || !isString(title)) throw new Error("Title is missing.");
			if (title.length < 10) throw new Error("Title is too short.");

			const coverImageId = coverImageLink
				? await getPostIdFromImage(coverImageLink)
				: undefined;

			if (!body || !isString(body)) throw new Error("Body is missing.");

			const creationProps: ArticlePostCreationProps = {
				title: title.trim(),
				coverImageId,
				body,
				tags: tags ? tags.map((tag) => tag.toLowerCase()) : [],
				location: location?.trim(),
			};

			setValidationStatus("PASSED");
			setValidationErrors([]);

			return result.ok(creationProps);
		} catch (err) {
			setValidationStatus("FAILED");
			setValidationErrors([(err as Error).message]);
			return result.fail(err as Error);
		}
	};

	const createPost = async (formData: FormState): Promise<Result<true>> => {
		try {
			setSubmissionStatus("SUBMITTING");

			const creationProps = await (
				await validateForm(formData)
			).unwrapOrElse((err) => {
				throw err;
			});

			(await createArticlePost(creationProps)).unwrapOrElse((err) => {
				throw err;
			});

			setSubmissionStatus("SUCCESS");
			return result.ok(true);
		} catch (err) {
			console.error(err);
			setSubmissionStatus("FAIL");
			return result.fail(new Error("Failed to create post."));
		}
	};

	const onSubmit: MouseEventHandler<HTMLButtonElement> = (e) => {
		e.preventDefault();

		createPost(formData).then((confirmation) =>
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

	const textInputOnChange = (e: ChangeEvent<HTMLInputElement>) =>
		setFormData({ ...formData, [e.target.name]: e.target.value });

	return (
		<form className={S.formRoot}>
			<label className={S.fieldLabel}>
				<span className={S.fieldLabelText}>Title*</span>
				<input
					className={S.fieldInput}
					name="title"
					type="text"
					placeholder="Title"
					onChange={textInputOnChange}
				/>
			</label>

			<label className={S.fieldLabel}>
				<span className={S.fieldLabelText}>Cover Image Link</span>
				<input
					className={S.fieldInput}
					name="coverImageLink"
					type="url"
					onChange={textInputOnChange}
					placeholder="Link to refound post"
				/>
			</label>

			<label className={S.fieldLabel}>
				<span className={S.fieldLabelText}>Tags</span>
				<TagInput
					name="tags"
					onChange={(values) => {
						setFormData({ ...formData, tags: values });
					}}
				/>
			</label>

			<label className={S.fieldLabel}>
				<span className={S.fieldLabelText}>Location</span>
				<input
					className={S.fieldInput}
					name="location"
					type="text"
					onChange={textInputOnChange}
					placeholder="Where is this about?"
				/>
			</label>

			<label className={S.fieldLabel}>
				<span className={S.fieldLabelText}>Article*</span>
				<RichTextEditor
					onChange={(htmlString) => {
						setBodyData(htmlString);
					}}
				/>
			</label>
			<PolyButton
				label="submit"
				as="button"
				size="lg"
				disabled={submissionStatus !== "IDLE"}
				fullWidth
				icon="rightArrow"
				aria-label="submit"
				onClick={onSubmit}
			/>
			{validationErrors.length > 0 && (
				<div className="flex flex-col gap-2 text-sm text-red-900">
					{" "}
					{validationErrors.map((errorText) => (
						<p key={errorText}>{errorText}</p>
					))}
				</div>
			)}
		</form>
	);
};