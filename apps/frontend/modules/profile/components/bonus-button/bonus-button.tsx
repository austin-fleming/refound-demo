import { useRefoundContracts } from "@modules/refound/hooks/use-refound-contracts";
import type { ProfileOwnerAddress } from "@modules/refound/models/profile.model";
import { cloin } from "@utils/cloin";
import { useState } from "react";

export const BonusButton = ({ receivingAddress }: { receivingAddress: ProfileOwnerAddress }) => {
	const { sendBonus } = useRefoundContracts();
	const [state, setState] = useState<"IDLE" | "SUBMITTING" | "SUCCESS" | "FAIL">("IDLE");

	const clickHandler = () => {
		setState("SUBMITTING");
		sendBonus(receivingAddress).then((outcome) =>
			outcome.match({
				ok: () => {
					setState("SUCCESS");
				},
				fail: () => {
					setState("FAIL");
				},
			}),
		);
	};

	return (
		<button
			onClick={clickHandler}
			disabled={state === "SUBMITTING" || state === "SUCCESS"}
			className={cloin(
				"btn w-full text-left",
				state === "SUBMITTING" && "loading",
				state === "SUCCESS" && "btn-success",
				state === "FAIL" && "btn-error",
			)}
		>
			{state === "SUCCESS" ? "Sent!" : "Send Bonus"}
		</button>
	);
};
