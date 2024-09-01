import { Option } from '@/components/select/select'
import { useEffect, useState } from 'react'

export const useSelectedOptions = <T extends Option>(
	options: T[],
	defaultValue?: string | number | (string | number)[]
) => {
	const [selectedOptions, setSelectedOptions] = useState<T[]>([])

	useEffect(() => {
		if (defaultValue) {
			const defaultOptions = Array.isArray(defaultValue)
				? defaultValue
						.map(value =>
							options.find(
								option =>
									option.name === value || option.id === value
							)
						)
						.filter((option): option is T => option !== undefined)
				: options.find(
						option =>
							option.name === defaultValue ||
							option.id === defaultValue
				  )
				? [
						options.find(
							option =>
								option.name === defaultValue ||
								option.id === defaultValue
						),
				  ].filter((option): option is T => option !== undefined)
				: []

			setSelectedOptions(defaultOptions)
		}
	}, [defaultValue, options])

	return { selectedOptions, setSelectedOptions }
}
