import clsx from 'clsx'
import { ReactNode, useEffect, useRef, useState } from 'react'
import { Dropdown } from './dropdown/dropdown'
import { Input } from './input/input'
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
	renderDropdown?: (
		options: T[],
		selectedOptions: T[],
		handleSelect: (option: T) => void
	) => ReactNode
	className?: string
	dropdownClassName?: string
}

export const Select = <T extends Option>({
	options,
	isMultiSelect = false,
	defaultValue,
	renderDropdown,
	className,
	dropdownClassName,
}: SelectProps<T>) => {
	const [selectedOptions, setSelectedOptions] = useState<T[]>([])
	const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false)
	const selectRef = useRef<HTMLDivElement>(null)

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

	const handleKeyDown = (event: React.KeyboardEvent) => {
		if (event.key === 'Enter') {
			setIsDropdownOpen(!isDropdownOpen)
		} else if (event.key === 'Escape') {
			setIsDropdownOpen(false)
		}
	}

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (
				selectRef.current &&
				!selectRef.current.contains(event.target as Node)
			) {
				setIsDropdownOpen(false)
			}
		}

		document.addEventListener('mousedown', handleClickOutside)
		return () => {
			document.removeEventListener('mousedown', handleClickOutside)
		}
	}, [])

	return (
		<div
			className={clsx(style.selectWrap, className)}
			ref={selectRef}
			tabIndex={0}
			onKeyDown={handleKeyDown}
		>
			<Input
				displayValue={displayValue}
				isDropdownOpen={isDropdownOpen}
				setIsDropdownOpen={setIsDropdownOpen}
			/>
			{isDropdownOpen &&
				(renderDropdown ? (
					renderDropdown(options, selectedOptions, handleSelect)
				) : (
					<Dropdown
						options={options}
						selectedOptions={selectedOptions}
						handleSelect={handleSelect}
						className={dropdownClassName}
					/>
				))}
		</div>
	)
}
