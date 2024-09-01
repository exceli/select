import { useClickOutside } from '@/hooks/useClickOutside'
import { useDropdownToggle } from '@/hooks/useDropdownToggle'
import { useHandleSelect } from '@/hooks/useHandleSelect'
import { useSearch } from '@/hooks/useSearch'
import { useSelectedOptions } from '@/hooks/useSelectedOptions'
import { getDisplayValue } from '@/utils/getDisplayValue'
import clsx from 'clsx'
import { KeyboardEvent, ReactNode, useRef } from 'react'
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
	onCreateOption?: (name: string) => Promise<T>
	className?: string
	dropdownClassName?: string
	enableSearch?: boolean
	placeholder?: string
	onChange?: (selectedOptions: T[]) => void
}

export const Select = <T extends Option>({
	options,
	isMultiSelect = false,
	defaultValue,
	renderDropdown,
	renderLabel,
	onCreateOption,
	className,
	dropdownClassName,
	enableSearch = false,
	placeholder = 'Placeholder',
	onChange,
}: SelectProps<T>) => {
	const { selectedOptions, setSelectedOptions } = useSelectedOptions(
		options,
		defaultValue
	)
	const { isDropdownOpen, toggleDropdown, closeDropdown } =
		useDropdownToggle()
	const { searchValue, handleSearch, filteredOptions } = useSearch(options)
	const selectRef = useRef<HTMLDivElement>(null)

	const handleSelect = useHandleSelect({
		isMultiSelect,
		setSelectedOptions,
		closeDropdown,
		handleSearch,
		onChange,
	})

	const handleRemove = (index: number) => {
		const newSelectedOptions = selectedOptions.filter((_, i) => i !== index)
		setSelectedOptions(newSelectedOptions)
		if (onChange) {
			setTimeout(() => onChange(newSelectedOptions), 0)
		}
	}

	const handleCreateOption = async (name: string) => {
		if (onCreateOption) {
			const newOption = await onCreateOption(name)
			const newSelectedOptions = isMultiSelect
				? [...selectedOptions, newOption]
				: [newOption]

			setSelectedOptions(newSelectedOptions)
			if (onChange) {
				setTimeout(() => onChange(newSelectedOptions), 0)
			}
			handleSearch('')
			closeDropdown()
		}
	}

	const handleKeyDown = (event: KeyboardEvent) => {
		if (event.key === 'Enter') {
			closeDropdown()
		} else if (event.key === 'Escape') {
			closeDropdown()
		}
	}

	useClickOutside(selectRef, closeDropdown)

	return (
		<div
			className={clsx(style.selectWrap, className)}
			ref={selectRef}
			tabIndex={0}
			onKeyDown={handleKeyDown}
		>
			<Input
				displayValue={getDisplayValue(
					selectedOptions,
					isMultiSelect,
					renderLabel
				)}
				renderLabel={renderLabel}
				isDropdownOpen={isDropdownOpen}
				setIsDropdownOpen={toggleDropdown}
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
						handleCreateOption={
							onCreateOption ? handleCreateOption : undefined
						}
						searchValue={searchValue}
						className={dropdownClassName}
					/>
				))}
		</div>
	)
}
