import { SignUpForm } from "@modules/account/components/sign-up-form";
import { ContentSection } from "@modules/ui/content-section";

export const SignUpView = () => {
	return (
		<ContentSection width="sm" className="flex flex-col items-center gap-12">
			<ul className="steps">
				<li className={`step step-neutral`}>
					<span className="text-xs font-bold tracking-wide px-[1em]">
						Connect Your Wallet
					</span>
				</li>
				<li className={`step step-neutral`}>
					<span className="text-xs font-bold tracking-wide px-[1em]">
						Create Your Profile
					</span>
				</li>
			</ul>

			<h1 className="text-2xl font-bold">Create Your Account</h1>

			<SignUpForm />
		</ContentSection>
	);
};
