import clsx from 'clsx'
import { FC } from 'react'
import style from './customLabel.module.scss'

interface CustomLabelProps {
	name: string
	avatarUrl?: string
	onRemove?: () => void
}

export const CustomLabel: FC<CustomLabelProps> = ({
	name,
	avatarUrl,
	onRemove,
}) => {
	return (
		<div className={clsx(style.labelContainer)}>
			{avatarUrl && (
				<img src={avatarUrl} alt={`${name}`} className={style.avatar} />
			)}
			<span className={style.name}>{name}</span>
			{onRemove && (
				<button className={style.removeButton} onClick={onRemove}>
					&times;
				</button>
			)}
		</div>
	)
}
