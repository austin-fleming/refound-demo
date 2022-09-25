import type { NextPage } from "next";

export const BeneficiariesView: NextPage = () => {
	return (
		<>
			<section id="hero">
				<h1>Beneficiaries</h1>
				<div>
					<p>Specify an another address that can inherit your account.</p>
					<ol>
						<li>
							<p>
								<span className="font-bold">Step 01:</span> Add another address that
								you trust.
							</p>
						</li>
						<li>
							<p>
								<span className="font-bold">Step 02:</span> In the event you can no
								longer use your account, your beneficiary can put in a claim for
								your account.
							</p>
						</li>
						<li>
							<p>
								<span className="font-bold">Step 03:</span> You will have a time
								period where you can reject the claim.
							</p>
						</li>
						<li>
							<p>
								<span className="font-bold">Step 04:</span> If you don&apos;t
								object, your beneficiary will be able to withdraw your current
								balance and future earnings.
							</p>
						</li>
					</ol>
				</div>
			</section>
			<section id="current"></section>
		</>
	);
};
