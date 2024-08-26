'use client'

import { Select } from '../select/select'
import style from './main.module.scss'

const options = [
	{
		id: 1,
		name: 'List item 1',
	},
	{
		id: 2,
		name: 'List item 2',
	},
	{
		id: 3,
		name: 'List item 3',
	},
	{
		id: 4,
		name: 'List item 4',
	},
	{
		id: 5,
		name: 'List item 5',
	},
	{
		id: 6,
		name: 'List item 6',
	},
]

export const MainPage = () => {
	return (
		<div className={style.main}>
			<Select
				options={options}
				isMultiSelect={true}
				getOptionId={option => option.id}
				getOptionName={option => option.name}
			/>
		</div>
	)
}
