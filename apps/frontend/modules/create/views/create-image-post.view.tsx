import type { NextPage } from "next";
import { Suspense, useEffect, useState } from "react";
import { RichTextEditor } from "../components/rich-text-editor/rich-text-editor";

export const CreateImagePostView: NextPage = () => {
	return (
		<section className="flex flex-col w-full max-w-screen-md py-48 mx-auto">
			<RichTextEditor />
		</section>
	);
};
