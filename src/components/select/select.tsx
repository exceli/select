import { FC, useState } from 'react'
import style from './select.module.scss'

interface SelectProps {
	options: string[]
}

export const Select: FC<SelectProps> = ({ options }) => {
	const [selectedOption, setSelectedOption] = useState<string | null>(null)
	const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false)

	const handleSelect = (option: string) => {
		setSelectedOption(option)
		setIsDropdownOpen(false)
	}

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
						value={selectedOption || ''}
						placeholder="Select an option"
					/>
				</div>
			</div>
			{isDropdownOpen && (
				<div className={style.selectDropdown}>
					{options.map((option, index) => (
						<div
							key={index}
							className={style.selectDropdownItem}
							onClick={() => handleSelect(option)}
						>
							{option}
						</div>
					))}
				</div>
			)}
		</div>
	)
}
