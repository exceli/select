import clsx from 'clsx'
import { Option } from '../select'
import style from './dropdown.module.scss'
import { Item } from './item/item'

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
					<Item
						key={option.id}
						option={option}
						selectedOptions={selectedOptions}
						handleSelect={handleSelect}
					/>
				))}
			</div>
		</div>
	)
}
