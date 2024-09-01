import { Option } from '@/components/select/select'
import { ReactNode } from 'react'

export const getDisplayValue = <T extends Option>(
    selectedOptions: T[],
    isMultiSelect: boolean,
    renderLabel?: (option: T) => ReactNode
): ReactNode[] => {
    if (isMultiSelect) {
        return selectedOptions.map(option =>
            renderLabel ? renderLabel(option) : option.name
        )
    } else {
        return selectedOptions.length > 0
            ? [
                renderLabel
                    ? renderLabel(selectedOptions[0])
                    : selectedOptions[0].name,
            ]
            : []
    }
}
