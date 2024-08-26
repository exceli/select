import { useState } from 'react'
import style from './select.module.scss'

interface SelectProps<T> {
	options: T[]
	isMultiSelect?: boolean
	getOptionId: (option: T) => number
	getOptionName: (option: T) => string
}

export const Select = <T,>({
	options,
	isMultiSelect = false,
	getOptionId,
	getOptionName,
}: SelectProps<T>) => {
	const [selectedOptions, setSelectedOptions] = useState<T[]>([])
	const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false)

	const handleSelect = (option: T) => {
		const optionId = getOptionId(option)
		if (isMultiSelect) {
			setSelectedOptions(prevSelectedOptions =>
				prevSelectedOptions.some(opt => getOptionId(opt) === optionId)
					? prevSelectedOptions.filter(
							opt => getOptionId(opt) !== optionId
					  )
					: [...prevSelectedOptions, option]
			)
		} else {
			setSelectedOptions([option])
			setIsDropdownOpen(false)
		}
	}

	const displayValue = isMultiSelect
		? selectedOptions.map(getOptionName).join(', ')
		: selectedOptions[0]
		? getOptionName(selectedOptions[0])
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
							key={getOptionId(option)}
							className={`${style.selectDropdownItem} ${
								selectedOptions.some(
									opt =>
										getOptionId(opt) === getOptionId(option)
								)
									? style.selected
									: ''
							}`}
							onClick={() => handleSelect(option)}
						>
							{getOptionName(option)}
						</div>
					))}
				</div>
			)}
		</div>
	)
}
