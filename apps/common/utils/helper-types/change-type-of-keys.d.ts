export type ChangeTypeOfKeys<T extends object, Keys extends keyof T, NewType> = {
	[key in keyof T]: key extends Keys ? NewType : T[key];
};
