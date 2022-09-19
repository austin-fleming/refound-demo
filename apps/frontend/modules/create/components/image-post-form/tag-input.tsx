import { useEffect, useState } from "react";
import CreatableSelect from "react-select/creatable";
import type { OnChangeValue, ActionMeta } from "react-select";

type Option = {
	readonly label: string;
	readonly value: string;
};

const createOption = (label: string) => ({
	label,
	value: label,
});

export const TagInput = ({
	name,
	onChange,
}: {
	name: string;
	onChange: (tagList: string[]) => void;
}) => {
	const [fieldState, setFieldState] = useState<{ inputValue: string; value: readonly Option[] }>({
		inputValue: "",
		value: [],
	});

	useEffect(() => {
		onChange(fieldState.value.map((value) => value.value));
	}, [fieldState]);

	return (
		<CreatableSelect
			name={name}
			components={{
				DropdownIndicator: null,
			}}
			inputValue={fieldState.inputValue}
			isClearable
			isMulti
			menuIsOpen={false}
			placeholder="Start typing then press enter"
			onChange={(newValue: OnChangeValue<Option, true>, actionMeta: ActionMeta<Option>) => {
				setFieldState({ ...fieldState, value: newValue });
			}}
			onInputChange={(inputValue) => {
				setFieldState({ ...fieldState, inputValue });
			}}
			onKeyDown={(event) => {
				const { inputValue, value } = fieldState;

				if (!inputValue) return;

				switch (event.key) {
					case "Enter":
					case "Tab":
						setFieldState({
							inputValue: "",
							value: [...value, createOption(inputValue)],
						});
						event.preventDefault();
				}
			}}
			value={fieldState.value}
		/>
	);
};
