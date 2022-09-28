export const sleep = (ms: number, onSleep?: () => void): Promise<void> => {
	return new Promise((resolve) => {
		setTimeout(resolve, ms);
		if (onSleep) {
			onSleep();
		}
	});
};
