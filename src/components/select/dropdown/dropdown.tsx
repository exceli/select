import clsx from 'clsx'
import { Option } from '../select'
import style from './dropdown.module.scss'
import { Item } from './item/item'

interface DropdownProps<T extends Option> {
	options: T[]
	selectedOptions: T[]
	handleSelect: (option: T) => void
	handleCreateOption?: (name: string) => void
	searchValue: string
	className?: string
}

export const Dropdown = <T extends Option>({
	options,
	selectedOptions,
	handleSelect,
	handleCreateOption,
	searchValue,
	className,
}: DropdownProps<T>) => {
	const hasMatchingOptions = options.length > 0

	const noMatchingOptions = !hasMatchingOptions && handleCreateOption

	return (
		<div className={clsx(style.dropdown, className)}>
			<div className={style.wrap}>
				{hasMatchingOptions ? (
					options.map(option => (
						<Item
							key={option.id}
							option={option}
							selectedOptions={selectedOptions}
							handleSelect={handleSelect}
						/>
					))
				) : noMatchingOptions ? (
					<div
						className={style.createOption}
						onClick={() => handleCreateOption(searchValue)}
					>
						+ Создать "{searchValue}"
					</div>
				) : null}
			</div>
		</div>
	)
}
