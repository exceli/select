import { FC, ReactNode } from 'react'
import style from './input.module.scss'

interface InputProps {
	displayValue: ReactNode
	isDropdownOpen: boolean
	setIsDropdownOpen: React.Dispatch<React.SetStateAction<boolean>>
	onRemove: (index: number) => void
}

export const Input: FC<InputProps> = ({
	displayValue,
	isDropdownOpen,
	setIsDropdownOpen,
	onRemove,
}) => {
	const hasSelectedItems = Array.isArray(displayValue)
		? displayValue.length > 0
		: typeof displayValue === 'string' && displayValue.length > 0

	return (
		<div
			className={style.selectContainer}
			onClick={() => setIsDropdownOpen(!isDropdownOpen)}
		>
			<div className={style.selectInput}>
				{hasSelectedItems ? (
					<div className={style.selectedItems}>
						{Array.isArray(displayValue)
							? displayValue.map((val, index) => (
									<div
										key={index}
										className={style.selectedOption}
									>
										{val}
										<span
											className={style.removeIcon}
											onClick={e => {
												e.stopPropagation()
												onRemove(index)
											}}
										>
											&times;
										</span>
									</div>
							  ))
							: displayValue}
					</div>
				) : (
					<input
						type="text"
						readOnly
						value=""
						placeholder="Placeholder"
					/>
				)}
			</div>
		</div>
	)
}
