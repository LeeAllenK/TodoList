import React from 'react';

export const EditButton = ({onClick,style ,value, children})=>{

	return(
	<button
	className='editBtn'
	style={style}
	onClick={(e) => {
		e.stopPropagation();
		onClick();
	}}		
	>
	{children}
	{value}
	</button>
	)
}