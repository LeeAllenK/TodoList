import {React , useState , useContext} from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleArrowUp } from '@fortawesome/free-solid-svg-icons';
import {TodoDispatchContext} from '../../TodosContext'

let nextId = 1;

const addTodo = async (text, dispatch) => {
	const newTodo = { text, completed: false };
	try {
		const res = await fetch(`${import.meta.env.VITE_API_URL}/todos`,{
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
		dispatch({
			type: 'add',
			id: data._id,
			text: data.text,
		});
	} catch(err) {
		console.error('Error adding todo', err);
	}
};

export const AddButton = () => {
	const [text , setText] = useState('');
	const dispatch = useContext(TodoDispatchContext);
	return (
		 <div className='inputBorder'>
			<input
				className='inputText'
				type='text'
				value={text}
				onChange={(e) => setText(e.target.value)}
			/>
		{text.length > 0 &&
		<FontAwesomeIcon 
		icon={faCircleArrowUp} 
		style={{ cursor: 'pointer' }}  
		onClick={(e) => {
			e.preventDefault();
			setText('');
			addTodo(text, dispatch);
		}}
		></FontAwesomeIcon>
		}
    </div>
		
	)
}