import { FC } from 'react'

interface CustomLabelProps {
	name: string
}

export const CustomLabel: FC<CustomLabelProps> = ({ name }) => {
	return (
		<span
			style={{
				color: 'red',
				backgroundColor: 'rgb(135, 255, 135)',
				borderRadius: '5px',
			}}
		>
			{name}
		</span>
	)
}
