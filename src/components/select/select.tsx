import { useSearch } from '@/hooks/useSearch'
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
	renderLabel?: (option: T) => ReactNode
	className?: string
	dropdownClassName?: string
	enableSearch?: boolean
	placeholder?: string
}

export const Select = <T extends Option>({
	options,
	isMultiSelect = false,
	defaultValue,
	renderDropdown,
	renderLabel,
	className,
	dropdownClassName,
	enableSearch = false,
	placeholder = 'Placeholder',
}: SelectProps<T>) => {
	const [selectedOptions, setSelectedOptions] = useState<T[]>([])
	const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false)
	const selectRef = useRef<HTMLDivElement>(null)

	const { searchValue, handleSearch, filteredOptions } = useSearch(options)

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
		handleSearch('')
	}

	const handleRemove = (index: number) => {
		setSelectedOptions(prevSelectedOptions =>
			prevSelectedOptions.filter((_, i) => i !== index)
		)
	}

	const getDisplayValue = (): ReactNode[] => {
		if (isMultiSelect) {
			return selectedOptions.map(option =>
				renderLabel ? renderLabel(option) : option.name
			)
		} else {
			return selectedOptions.length > 0
				? [
						renderLabel
							? renderLabel(selectedOptions[0])
							: selectedOptions[0].name,
				  ]
				: []
		}
	}

	const displayValue = getDisplayValue()

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
				onRemove={handleRemove}
				onSearch={handleSearch}
				searchValue={searchValue}
				enableSearch={enableSearch}
				placeholder={placeholder}
			/>
			{isDropdownOpen &&
				(renderDropdown ? (
					renderDropdown(
						filteredOptions,
						selectedOptions,
						handleSelect
					)
				) : (
					<Dropdown
						options={filteredOptions}
						selectedOptions={selectedOptions}
						handleSelect={handleSelect}
						className={dropdownClassName}
					/>
				))}
		</div>
	)
}
