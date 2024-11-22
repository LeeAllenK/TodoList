import React from 'react'


import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'

export const TrashButton = ({ onClick, children, style }) => {

	return (

		<FontAwesomeIcon
			icon={faTrash}
			style={style}
			onClick={(e) => {
				e.stopPropagation();
				onClick();
			}}
		>
			{children}
		</FontAwesomeIcon>
	)
}