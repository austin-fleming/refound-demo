import { useEditor, EditorContent } from "@tiptap/react";
import type { Editor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import type { ReactNode } from "react";
import { useCallback } from "react";
import S from "./rich-text-editor.module.css";
import { cloin } from "@utils/cloin";

const MenuButton = ({
	children,
	action,
	isActive = false,
}: {
	children: ReactNode;
	action: () => void;
	isActive?: boolean;
}) => (
	<button
		type="button"
		onClick={action}
		className={`${S.toolButton} ${isActive ? S.isActive : ""}`}
	>
		{children}
	</button>
);

/* eslint-disable-next-line sonarjs/cognitive-complexity */
const MenuBar = ({ editor }: { editor: Editor | null }) => {
	const addImage = useCallback(() => {
		const url = window?.prompt("URL");
		if (url && editor) {
			editor.chain().focus().setImage({ src: url }).run();
		}
	}, [editor]);

	return !editor ? null : (
		<div className={S.toolbar}>
			<MenuButton
				action={() => editor.chain().focus().setParagraph().run()}
				isActive={editor.isActive("paragraph")}
			>
				P
			</MenuButton>

			<MenuButton
				action={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
				isActive={editor.isActive("heading", { level: 1 })}
			>
				H1
			</MenuButton>

			<MenuButton
				action={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
				isActive={editor.isActive("heading", { level: 2 })}
			>
				H2
			</MenuButton>

			<MenuButton
				action={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
				isActive={editor.isActive("heading", { level: 3 })}
			>
				H3
			</MenuButton>

			<MenuButton
				action={() => editor.chain().focus().toggleHeading({ level: 4 }).run()}
				isActive={editor.isActive("heading", { level: 4 })}
			>
				H4
			</MenuButton>

			<MenuButton
				action={() => editor.chain().focus().toggleBold().run()}
				isActive={editor.isActive("bold")}
			>
				<span className="font-bold">Bold</span>
			</MenuButton>

			<MenuButton
				action={() => editor.chain().focus().toggleItalic().run()}
				isActive={editor.isActive("italic")}
			>
				<span className="italic">Italic</span>
			</MenuButton>

			<MenuButton
				action={() => editor.chain().focus().toggleStrike().run()}
				isActive={editor.isActive("strike")}
			>
				<span className="line-through">Strike</span>
			</MenuButton>

			<MenuButton action={() => editor.chain().focus().unsetAllMarks().run()}>
				clear marks
			</MenuButton>

			<MenuButton action={() => editor.chain().focus().clearNodes().run()}>
				clear nodes
			</MenuButton>

			<MenuButton
				action={() => editor.chain().focus().toggleBulletList().run()}
				isActive={editor.isActive("bulletList")}
			>
				Bullet List
			</MenuButton>

			<MenuButton
				action={() => editor.chain().focus().toggleOrderedList().run()}
				isActive={editor.isActive("orderedList")}
			>
				Ordered List
			</MenuButton>

			<MenuButton
				action={() => editor.chain().focus().toggleBlockquote().run()}
				isActive={editor.isActive("blockquote")}
			>
				Quote
			</MenuButton>

			<MenuButton action={addImage}>image</MenuButton>

			<MenuButton action={() => editor.chain().focus().undo().run()}>undo</MenuButton>

			<MenuButton action={() => editor.chain().focus().redo().run()}>redo</MenuButton>
		</div>
	);
};

export const RichTextEditor = ({ onChange }: { onChange: (htmlString: string) => void }) => {
	const editor = useEditor({
		extensions: [StarterKit, Image],
		content: "<p>Start typing</p>",
		editorProps: {
			attributes: {
				class: S.editor,
			},
		},
		onUpdate: ({ editor }) => {
			onChange(editor.getHTML());
		},
	});

	return (
		<div className={S.root}>
			<MenuBar editor={editor} />
			<EditorContent editor={editor} />
		</div>
	);
};
