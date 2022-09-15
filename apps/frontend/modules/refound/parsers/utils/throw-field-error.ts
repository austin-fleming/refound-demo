export const throwFieldError = (fieldName: string) => {
	throw new Error(`${fieldName} is invalid`);
};
