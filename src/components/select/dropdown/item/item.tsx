import { Option } from '../../select'
import style from './item.module.scss'

interface ItemProps<T extends Option> {
	option: T
	selectedOptions: T[]
	handleSelect: (option: T) => void
}

export const Item = <T extends Option>({
	option,
	selectedOptions,
	handleSelect,
}: ItemProps<T>) => {
	return (
		<div
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
	)
}
