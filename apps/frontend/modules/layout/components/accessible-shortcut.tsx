export const AccessibleShortcut = ({ targetId, label }: { targetId: string; label: string }) => (
	<a className="fixed top-[-100%] left-0 focus:top-0" href={targetId}>
		{label}
	</a>
);
