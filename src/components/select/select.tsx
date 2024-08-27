import { useEffect, useState } from 'react'
import style from './select.module.scss'

export interface Option {
	id: number
	label: string
	name: string
}

interface SelectProps<T extends Option> {
	options: T[]
	isMultiSelect?: boolean
	defaultValue?: string | number | (string | number)[]
}

export const Select = <T extends Option>({
	options,
	isMultiSelect = false,
	defaultValue,
}: SelectProps<T>) => {
	const [selectedOptions, setSelectedOptions] = useState<T[]>([])
	const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false)

	const findOptionByValue = (value: string | number): T | undefined => {
		return options.find(
			option => option.name === value || option.id === value
		)
	}

	useEffect(() => {
		if (defaultValue) {
			const defaultOptions = Array.isArray(defaultValue)
				? defaultValue
						.map(value => findOptionByValue(value))
						.filter((option): option is T => option !== undefined)
				: findOptionByValue(defaultValue)
				? [findOptionByValue(defaultValue)].filter(
						(option): option is T => option !== undefined
				  )
				: []

			setSelectedOptions(defaultOptions)
		}
	}, [defaultValue])

	const handleSelect = (option: T) => {
		if (isMultiSelect) {
			setSelectedOptions(prevSelectedOptions =>
				prevSelectedOptions.some(opt => opt.id === option.id)
					? prevSelectedOptions.filter(opt => opt.id !== option.id)
					: [...prevSelectedOptions, option]
			)
		} else {
			setSelectedOptions([option])
			setIsDropdownOpen(false)
		}
	}

	const displayValue = isMultiSelect
		? selectedOptions.map(option => option.label || option.name).join(', ')
		: selectedOptions[0]
		? selectedOptions[0].label || selectedOptions[0].name
		: ''

	return (
		<div className={style.selectWrap}>
			<div
				className={style.selectContainer}
				onClick={() => setIsDropdownOpen(!isDropdownOpen)}
			>
				<div className={style.selectInput}>
					<input
						type="text"
						readOnly
						value={displayValue}
						placeholder="Выберите опцию"
					/>
				</div>
			</div>
			{isDropdownOpen && (
				<div className={style.selectDropdown}>
					{options.map(option => (
						<div
							key={option.id}
							className={`${style.selectDropdownItem} ${
								selectedOptions.some(
									opt => opt.id === option.id
								)
									? style.selected
									: ''
							}`}
							onClick={() => handleSelect(option)}
						>
							{option.label || option.name}
						</div>
					))}
				</div>
			)}
		</div>
	)
}
