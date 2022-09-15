export const jsonFileFromObject = (fileName: string, obj: Record<string, any>): File => {
	const jsonBlob = new Blob([JSON.stringify(obj)], { type: "application/json" });
	return new File([jsonBlob], fileName);
};
