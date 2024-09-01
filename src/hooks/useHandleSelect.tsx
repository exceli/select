import { Option } from '../components/select/select'

interface UseHandleSelectProps<T extends Option> {
	isMultiSelect: boolean
	setSelectedOptions: React.Dispatch<React.SetStateAction<T[]>>
	closeDropdown: () => void
	handleSearch: (value: string) => void
}

export const useHandleSelect = <T extends Option>({
	isMultiSelect,
	setSelectedOptions,
	closeDropdown,
	handleSearch,
}: UseHandleSelectProps<T>) => {
	return (option: T) => {
		setSelectedOptions(prevSelectedOptions =>
			isMultiSelect
				? prevSelectedOptions.some(opt => opt.id === option.id)
					? prevSelectedOptions.filter(opt => opt.id !== option.id)
					: [...prevSelectedOptions, option]
				: [option]
		)

		if (!isMultiSelect) {
			closeDropdown()
		}

		handleSearch('')
	}
}
