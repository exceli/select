import {
	ChangeEvent,
	FC,
	KeyboardEvent,
	ReactNode,
	useEffect,
	useRef,
} from 'react'
import style from './input.module.scss'

interface InputProps {
	displayValue: ReactNode
	isDropdownOpen: boolean
	setIsDropdownOpen: React.Dispatch<React.SetStateAction<boolean>>
	onRemove: (index: number) => void
	onSearch: (searchValue: string) => void
	searchValue: string
	enableSearch: boolean
	placeholder?: string
}

export const Input: FC<InputProps> = ({
	displayValue,
	isDropdownOpen,
	setIsDropdownOpen,
	onRemove,
	onSearch,
	searchValue,
	enableSearch,
	placeholder,
}) => {
	const inputRef = useRef<HTMLInputElement>(null)

	const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
		onSearch(e.target.value)
	}

	const handleContainerClick = (e: React.MouseEvent) => {
		if (inputRef.current && inputRef.current.contains(e.target as Node)) {
			if (!isDropdownOpen) {
				setIsDropdownOpen(true)
			}
		} else {
			setIsDropdownOpen(!isDropdownOpen)
			if (inputRef.current) {
				inputRef.current.focus()
			}
		}
	}

	const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
		if (e.key === 'Escape') {
			if (inputRef.current) {
				inputRef.current.blur()
			}
			setIsDropdownOpen(false)
		} else if (e.key === 'Backspace' && searchValue === '') {
			if (Array.isArray(displayValue) && displayValue.length > 0) {
				onRemove(displayValue.length - 1)
			}
		}
	}

	useEffect(() => {
		if (inputRef.current && isDropdownOpen) {
			inputRef.current.focus()
		}
	}, [isDropdownOpen])

	const hasSelectedItems =
		Array.isArray(displayValue) && displayValue.length > 0

	return (
		<div className={style.selectContainer} onClick={handleContainerClick}>
			<div className={style.selectInput}>
				<div className={style.selectedItems}>
					{hasSelectedItems
						? displayValue.map((val, index) => (
								<div
									key={index}
									className={style.selectedOption}
								>
									{val}
									<span
										className={style.removeIcon}
										onClick={e => {
											e.stopPropagation()
											onRemove(index)
										}}
									>
										&times;
									</span>
								</div>
						  ))
						: !enableSearch && (
								<input
									ref={inputRef}
									type="text"
									value={searchValue}
									onKeyDown={handleKeyDown}
									onChange={handleSearchChange}
									placeholder={
										hasSelectedItems ? '' : placeholder
									}
									className={style.searchInput}
								/>
						  )}
				</div>

				{enableSearch && (
					<input
						ref={inputRef}
						type="text"
						value={searchValue}
						onKeyDown={handleKeyDown}
						onChange={handleSearchChange}
						placeholder={hasSelectedItems ? '' : placeholder}
						className={style.searchInput}
					/>
				)}
			</div>
		</div>
	)
}
