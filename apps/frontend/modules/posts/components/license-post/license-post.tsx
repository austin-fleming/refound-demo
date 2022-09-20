import { useAccount } from "@modules/account/state/use-account";
import { useRefoundContracts } from "@modules/refound/hooks/use-refound-contracts";
import { LicenseType } from "@modules/refound/models/license.model";
import type { PostAggregate } from "@modules/refound/models/post.aggregate";
import { toast } from "@services/toast/toast";
import { cloin } from "@utils/cloin";
import { useState } from "react";

export const LicensePost = ({ post }: { post: PostAggregate }) => {
	const { account } = useAccount();
	const { purchaseLicense } = useRefoundContracts();
	const [selectedLicense, setSelectedLicense] = useState<LicenseType>(LicenseType.SingleUse);
	const [submitState, setSubmitState] = useState<"IDLE" | "SUBMITTING" | "SUCCESS" | "FAIL">(
		"IDLE",
	);

	return (
		<div className="flex flex-row items-start gap-2">
			<button
				type="button"
				className={cloin(
					"btn gap-2 ",
					submitState === "SUBMITTING" && "loading btn-disabled",
					submitState === "SUCCESS" && "btn-success",
					submitState === "FAIL" && "btn-error",
				)}
				onClick={(e) => {
					e.preventDefault();

					if (!account.address) {
						toast.error("Please log in before purchasing a license.");
						setSubmitState("IDLE");
						return;
					}

					setSubmitState("SUBMITTING");

					purchaseLicense(post.postId, selectedLicense).then((confirmation) =>
						confirmation.match({
							ok: () => {
								setSubmitState("SUCCESS");
								toast.error("Purchased!");
							},
							fail: (err) => {
								console.error(err);
								setSubmitState("FAIL");
								toast.error("Failed to purchase license");
							},
						}),
					);
				}}
			>
				{submitState === "SUCCESS" ? "Purchased!" : "Purchase License"}
			</button>

			<div className="flex flex-col gap-2 w-[10em]">
				<select
					className="w-full max-w-xs select select-ghost"
					value={selectedLicense}
					onChange={(e) => {
						setSelectedLicense(e.target.value as LicenseType);
					}}
				>
					<option value={LicenseType.SingleUse}>Single Use</option>
					<option value={LicenseType.PrintLicense}>Print License</option>
					<option value={LicenseType.WebLicense}>Web License</option>
					<option value={LicenseType.Outright}>Outright</option>
				</select>
				{selectedLicense === LicenseType.Outright && (
					<span className="text-xs">
						Outright license comes with a 2% royalty for the original creator on all
						future sales.
					</span>
				)}
			</div>
		</div>
	);
};
