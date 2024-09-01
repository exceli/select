import { Option } from '@/components/select/select'
import { useState } from 'react'

export const useSearch = <T extends Option>(options: T[]) => {
	const [searchValue, setSearchValue] = useState<string>('')

	const handleSearch = (value: string) => {
		setSearchValue(value)
	}

	const filteredOptions = options.filter(option =>
		option.name.toLowerCase().includes(searchValue.toLowerCase())
	)

	return {
		searchValue,
		handleSearch,
		filteredOptions,
	}
}
