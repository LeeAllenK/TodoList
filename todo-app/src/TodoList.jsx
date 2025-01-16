import { useState, useContext } from 'react';
import { EditButton } from './components/Buttons/EditBtn.jsx';
import { TrashButton } from './components/Buttons/DelBtn.jsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { TodoContext, TodoDispatchContext } from './TodosContext';

export default function TodoList({ darkClassName, darkStyle, todoStyle, getClass, getStyle, email }) {
	const items = useContext(TodoContext);
	return (
		<div className='ul-Border'>
			<ul className={'ul-list'}>
				{items.filter(item => item.email === email).map((item, index) => (
					<li className={darkClassName} key={index}>
						<Todos todo={item} editStyle={todoStyle} style={darkStyle} editBtnStyle={getStyle} className={getClass} email={email} />
					</li>
				))}
			</ul>
		</div>
	);
}
const updateTodo = async (id,clientId,email, newText, dispatch) => {
	const updateTodo = { text: newText, completed: false, email };
	try {
		const res = await fetch(`${import.meta.env.VITE_API_URL}/todos/${id ? id : clientId}`, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(updateTodo)
		});
		const data = await res.json();
		console.log('DATA', data);
		dispatch({
			type: 'edit',
			id,
			text: newText,
			completed: false,
			email
		});
	} catch(err) {
		console.error(err);
	}
};
const deleteTodo = async (id,clientId,email, dispatch) => {
	try {
		const res = await fetch(`${import.meta.env.VITE_API_URL}/todos/${id ? id : clientId}`, {
			method: 'DELETE'
		});
		if(!res.ok) {
			throw new Error(`Error: ${res.status} ${res.statusText}`);
		}
		const data = await res.json();
		dispatch({
			type: 'delete',
			id
		});
	} catch(err) {
		console.error('Problem with deleting item', err);
	}
};
function Todos({ todo, style, editBtnStyle, className, email }) {
	const [isEditing, setIsEditing] = useState(false);
	const [newText, setNewText] = useState(todo.text);
	const dispatch = useContext(TodoDispatchContext);
	let content;
	if(isEditing) {
		content = (
			<span>
				<input
					className='inputText'
					type='text'
					value={newText}
					onChange={(e) => setNewText(e.target.value)}
				/>
				<EditButton
					style={editBtnStyle}
					value="Save"
					onClick={() => {
						updateTodo(todo._id,todo.id,email, newText, dispatch);
						setIsEditing(false);
					}}
				/>
			</span>
		);
	} else {
		content = (
			<span>
				{todo.text}{' '}
				<FontAwesomeIcon
					icon={faPenToSquare}
					value='Edit'
					style={{ cursor: 'pointer' }}
					onClick={() => setIsEditing(true)}
				/>
				<TrashButton
					style={{ cursor: 'pointer' }}
					delClick={(e) => {
						e.stopPropagation();
						deleteTodo(todo._id,todo.id, email, dispatch);
					}}
				/>
			</span>
		);
	}
	return (
		<label className={className} style={style}>
			<input
				className='checkbox-container'
				type="checkbox"
				checked={todo.completed}
				onChange={(e) => {
					e.stopPropagation();
				}}
			/>
			{content}
		</label>
	);
}
