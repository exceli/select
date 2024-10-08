'use client'

import { useState } from 'react'
import { CustomDropdown } from '../customDropdown/customDropdown'
import { CustomLabel } from '../customLabel/customLabel'
import { Option, Select } from '../select/select'
import style from './main.module.scss'

const initialOptions: Option[] = [
	{
		id: 1,
		label: 'Subtitle',
		name: 'Item 1',
	},
	{
		id: 2,
		label: 'Subtitle',
		name: 'Item 2',
	},
	{
		id: 3,
		label: 'Subtitle',
		name: 'Item 3',
	},
	{
		id: 4,
		label: 'Subtitle',
		name: 'Item 4',
	},
	{
		id: 5,
		label: 'Subtitle',
		name: 'Item 5',
	},
	{
		id: 6,
		label: 'Subtitle',
		name: 'Item 6',
	},
]

export const MainPage = () => {
	const [options, setOptions] = useState<Option[]>(initialOptions)
	const [selectedOptions, setSelectedOptions] = useState<Option[]>([])

	const handleCreateOption = async (name: string): Promise<Option> => {
		const newOption = {
			id: options.length + 1,
			label: 'Subtitle',
			name,
		}
		setOptions(prevOptions => [...prevOptions, newOption])
		return newOption
	}

	const handleSelectChange = (newSelectedOptions: Option[]) => {
		setSelectedOptions(newSelectedOptions)
		console.log('selected', newSelectedOptions)
	}

	const handleRemoveLabel = (id: number) => {
		setSelectedOptions(prevSelected =>
			prevSelected.filter(option => option.id !== id)
		)
	}

	return (
		<div className={style.main}>
			<div>
				<div>
					<div>Default</div>
					<Select
						options={options}
						selectedOptions={selectedOptions}
						setSelectedOptions={setSelectedOptions}
						onChange={handleSelectChange}
					/>
				</div>
				<div>
					<div>Default value</div>
					<Select
						options={options}
						selectedOptions={selectedOptions}
						setSelectedOptions={setSelectedOptions}
						defaultValue={3}
						onChange={handleSelectChange}
					/>
				</div>
				<div>
					<div>Multiselect</div>
					<Select
						options={options}
						selectedOptions={selectedOptions}
						setSelectedOptions={setSelectedOptions}
						isMultiSelect={true}
						onChange={handleSelectChange}
					/>
				</div>
				<div>
					<div>Custom dropdown</div>
					<Select
						options={options}
						selectedOptions={selectedOptions}
						setSelectedOptions={setSelectedOptions}
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
						onChange={handleSelectChange}
					/>
				</div>
				<div>
					<div>Custom label</div>
					<Select
						options={options}
						selectedOptions={selectedOptions}
						setSelectedOptions={setSelectedOptions}
						isMultiSelect={true}
						defaultValue={3}
						renderLabel={option => (
							<CustomLabel
								name={option.name}
								avatarUrl="/avatar.png"
								onRemove={() => handleRemoveLabel(option.id)}
							/>
						)}
						onChange={handleSelectChange}
					/>
				</div>
				<div>
					<div>Search on</div>
					<Select
						options={options}
						selectedOptions={selectedOptions}
						setSelectedOptions={setSelectedOptions}
						defaultValue={3}
						isMultiSelect={true}
						enableSearch={true}
						onChange={handleSelectChange}
					/>
				</div>
				<div>
					<div>Search and add label on</div>
					<Select
						options={options}
						selectedOptions={selectedOptions}
						setSelectedOptions={setSelectedOptions}
						defaultValue={3}
						isMultiSelect={true}
						enableSearch={true}
						onCreateOption={handleCreateOption}
						onChange={handleSelectChange}
					/>
				</div>
			</div>
		</div>
	)
}
