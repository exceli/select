import clsx from 'clsx'
import { Option } from '../select'
import style from './dropdown.module.scss'

interface DropdownProps<T extends Option> {
	options: T[]
	selectedOptions: T[]
	handleSelect: (option: T) => void
	className?: string
}

export const Dropdown = <T extends Option>({
	options,
	selectedOptions,
	handleSelect,
	className,
}: DropdownProps<T>) => {
	return (
		<div className={clsx(style.dropdown, className)}>
			<div className={style.wrap}>
				{options.map(option => (
					<div
						key={option.id}
						className={`${style.selectDropdownItem} ${
							selectedOptions.some(opt => opt.id === option.id)
								? style.selected
								: ''
						}`}
						onClick={() => handleSelect(option)}
					>
						<div className={style.image}>
							<div>Aa</div>
						</div>
						<div className={style.text}>
							<div className={style.name}>{option.name}</div>
							<div className={style.label}>{option.label}</div>
						</div>
					</div>
				))}
			</div>
		</div>
	)
}
