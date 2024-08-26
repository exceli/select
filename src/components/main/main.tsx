'use client'

import { Select } from '../select/select'
import style from './main.module.scss'

const options = ['List item 1', 'List item 2', 'List item 3', 'List item 4']

export const MainPage = () => {
	return (
		<div className={style.main}>
			<Select options={options} />
		</div>
	)
}
