import { Option } from '@/components/select/select'

interface UseHandleSelectProps<T extends Option> {
	isMultiSelect: boolean
	setSelectedOptions: React.Dispatch<React.SetStateAction<T[]>>
	closeDropdown: () => void
	handleSearch: (value: string) => void
	onChange?: (selectedOptions: T[]) => void
}

export const useHandleSelect = <T extends Option>({
	isMultiSelect,
	setSelectedOptions,
	closeDropdown,
	handleSearch,
	onChange,
}: UseHandleSelectProps<T>) => {
	return (option: T) => {
		setSelectedOptions(prevSelectedOptions => {
			const newSelectedOptions = isMultiSelect
				? prevSelectedOptions.some(opt => opt.id === option.id)
					? prevSelectedOptions.filter(opt => opt.id !== option.id)
					: [...prevSelectedOptions, option]
				: [option]

			if (onChange) {
				setTimeout(() => onChange(newSelectedOptions), 0)
			}

			return newSelectedOptions
		})

		if (!isMultiSelect) {
			closeDropdown()
		}

		handleSearch('')
	}
}
