import type { Account } from "@modules/api/account";

export const AccountCard = ({data}:{data: Account}) => <article><code>{JSON.stringify(data, null, '\t')}</code></article>