import React, { useState, useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleArrowUp } from '@fortawesome/free-solid-svg-icons';
import { TodoContext,SetTodoContext } from '../../TodosContext';

const addTodo = async (text, todos,setTodos) => {
	const newTodo = { text, completed: false };
	try {
		const res = await fetch(`${import.meta.env.VITE_API_URL}/todos`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(newTodo),
		});
		if(!res.ok) {
			throw new Error(`Error: ${res.status} ${res.statusText}`);
		}
		const data = await res.json();
		console.log('POST ID:', data._id);
		setTodos([
			...todos,
			{ id: data._id, text: data.text, completed: false },
		]);
	} catch(err) {
		console.error('Error adding todo', err);
	}
};

export const AddButton = () => {
	const [text, setText] = useState('');
	const todos = useContext(TodoContext)
	const setTodos = useContext(SetTodoContext)
	return (
		<div className='inputBorder'>
			<input
				className='inputText'
				type='text'
				value={text}
				onChange={(e) => setText(e.target.value)}
			/>
			{text.length > 0 && (
				<FontAwesomeIcon
					icon={faCircleArrowUp}
					style={{ cursor: 'pointer' }}
					onClick={() => {
						addTodo(text,todos,setTodos);
						setText('');
					}}
				/>
			)}
		</div>
	);
};
