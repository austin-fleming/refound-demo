export const stringIsDate = (value: string): boolean => !Number.isNaN(Date.parse(value));
