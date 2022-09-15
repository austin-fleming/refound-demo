import type { Account } from "@modules/mocks/account";

export const AccountCard = ({ data }: { data: Account }) => (
	<article>
		<code>{JSON.stringify(data, null, "\t")}</code>
	</article>
);
