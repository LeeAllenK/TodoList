import React from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleArrowUp } from '@fortawesome/free-solid-svg-icons';

export const AddButton = ({ onClick, children, style }) => {

	return (
		<FontAwesomeIcon 
		icon={faCircleArrowUp} 
		style={{ cursor: 'pointer' }}  
		onClick={(e) => {
			e.stopPropagation();
			onClick();
		}}
		></FontAwesomeIcon>
	)
}