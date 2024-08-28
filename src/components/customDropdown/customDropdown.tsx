import { Option } from '../select/select'

interface CustomDropdownProps<T extends Option> {
	options: T[]
	selectedOptions: T[]
	handleSelect: (option: T) => void
}

export const CustomDropdown = <T extends Option>({
	options,
	selectedOptions,
	handleSelect,
}: CustomDropdownProps<T>) => {
	return (
		<div
			style={{
				backgroundColor: '#f0f0f0',
				padding: '10px',
				borderRadius: '5px',
			}}
		>
			{options.map(option => (
				<div
					key={option.id}
					style={{
						padding: '5px 10px',
						cursor: 'pointer',
						backgroundColor: selectedOptions.some(
							opt => opt.id === option.id
						)
							? '#d3d3d3'
							: 'transparent',
					}}
					onClick={() => handleSelect(option)}
				>
					{option.label || option.name}
				</div>
			))}
		</div>
	)
}
