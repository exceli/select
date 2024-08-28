'use client'

import { CustomDropdown } from '../customDropdown/customDropdown'
import { Option, Select } from '../select/select'
import style from './main.module.scss'

const options: Option[] = [
	{
		id: 1,
		label: 'Опция 1',
		name: 'Item 1',
	},
	{
		id: 2,
		label: 'Опция 2',
		name: 'Item 2',
	},
	{
		id: 3,
		label: 'Опция 3',
		name: 'Item 3',
	},
	{
		id: 4,
		label: 'Опция 4',
		name: 'Item 4',
	},
	{
		id: 5,
		label: 'Опция 5',
		name: 'Item 5',
	},
	{
		id: 6,
		label: 'Опция 6',
		name: 'Item 6',
	},
]

export const MainPage = () => {
	return (
		<div className={style.main}>
			<div>
				<div>
					<div>Default</div>
					<Select options={options} />
				</div>
				<div>
					<div>Default value</div>
					<Select options={options} defaultValue={3} />
				</div>
				<div>
					<div>Multiselect</div>
					<Select options={options} isMultiSelect={true} />
				</div>
				<div>
					<div>Custom dropdown</div>
					<Select
						options={options}
						renderDropdown={(
							options,
							selectedOptions,
							handleSelect
						) => (
							<CustomDropdown
								options={options}
								selectedOptions={selectedOptions}
								handleSelect={handleSelect}
							/>
						)}
					/>
				</div>
				<div>
					<div>Custom label</div>
					<Select
						options={options}
						renderLabel={option => (
							<span style={{ color: 'red' }}>{option.name}</span>
						)}
					/>
				</div>
			</div>
		</div>
	)
}
