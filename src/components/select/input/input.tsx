import { FC } from 'react'
import style from './input.module.scss'

interface InputProps {
	displayValue: string
	isDropdownOpen: boolean
	setIsDropdownOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export const Input: FC<InputProps> = ({
	displayValue,
	isDropdownOpen,
	setIsDropdownOpen,
}) => {
	return (
		<div
			className={style.selectContainer}
			onClick={() => setIsDropdownOpen(!isDropdownOpen)}
		>
			<div className={style.selectInput}>
				<input
					type="text"
					readOnly
					value={displayValue}
					placeholder="Placeholder"
				/>
			</div>
		</div>
	)
}
