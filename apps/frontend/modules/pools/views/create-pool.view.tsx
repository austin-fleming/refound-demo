import type { NextPage } from "next";
import { PoolForm } from "../components/pool-form/pool-form";

export const CreatePoolView: NextPage = () => {
	return (
		<section className="flex flex-col max-w-screen-md gap-12 py-16 mx-auto px-contentPadding">
			<h1 className="mx-auto text-2xl font-bold text-center">Create a Pool</h1>

			<p className="pb-[0.5em] text-sm text-center max-w-[35ch] mx-auto">
				Have a project you&apos;re trying to launch or a cause you want to support? Pools
				allow you to gather monetary support from the Refound community.
			</p>
			<PoolForm />
		</section>
	);
};
