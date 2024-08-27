'use client'

import { Option, Select } from '../select/select'
import style from './main.module.scss'

const options: Option[] = [
	{
		id: 1,
		label: 'Опция 1',
		name: 'List item 1',
	},
	{
		id: 2,
		label: 'Опция 2',
		name: 'List item 2',
	},
	{
		id: 3,
		label: 'Опция 3',
		name: 'List item 3',
	},
	{
		id: 4,
		label: 'Опция 4',
		name: 'List item 4',
	},
	{
		id: 5,
		label: 'Опция 5',
		name: 'List item 5',
	},
	{
		id: 6,
		label: 'Опция 6',
		name: 'List item 6',
	},
]

export const MainPage = () => {
	return (
		<div className={style.main}>
			<Select options={options} isMultiSelect={true} defaultValue={3} />
		</div>
	)
}
