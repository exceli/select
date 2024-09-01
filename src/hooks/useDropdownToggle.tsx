import { useState } from 'react'

export const useDropdownToggle = () => {
	const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false)

	const toggleDropdown = () => setIsDropdownOpen(prev => !prev)
	const closeDropdown = () => setIsDropdownOpen(false)

	return { isDropdownOpen, toggleDropdown, closeDropdown }
}
