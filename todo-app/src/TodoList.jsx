import { useState, useContext } from 'react';
import { EditButton } from './components/Buttons/EditBtn.jsx';
import { TrashButton } from './components/Buttons/DelBtn.jsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { TodoContext, SetTodoContext } from './TodosContext';

export default function TodoList({ darkClassName, darkStyle, todoStyle, getClass, getStyle }) {
	const items = useContext(TodoContext);
	return (
		<div className='ul-Border'>
			<ul className={'ul-list'}>
				{items.map((item, index) => (
					<li className={darkClassName} key={index}>
						<Todos todo={item} editStyle={todoStyle} style={darkStyle} editBtnStyle={getStyle} className={getClass} />
					</li>
				))}
			</ul>
		</div>
	);
}

const deleteTodo = async (id, todos, clientId, setTodos) => {
		try {
			const res = await fetch(`${import.meta.env.VITE_API_URL}/todos/${id ? id : clientId}`, {
				method: 'DELETE',
			});
			if(!res.ok) {
				throw new Error(`Error: ${res.status} ${res.statusText}`);
			}
			const data = await res.json();
			console.log('Deleted:', data);
			setTodos(todos.filter((t) => t._id !== id || t.id !== clientId));
		} catch(err) {
			console.error('Problem with deleting item', err);
		}
};

function Todos({ todo, style, editBtnStyle, className }) {
	const [isEditing, setIsEditing] = useState(false);
	const setTodos = useContext(SetTodoContext);
	const todos = useContext(TodoContext)
	let content;

	if(isEditing) {
		content = (
			<span>
				<input
					className='inputText'
					type='text'
					value={todo.text}
					onChange={(e) => {
						setTodos((prevTodo) =>
							prevTodo.map((t) => (t.id === todo.id ? { ...t, text: e.target.value } : t))
						);
					}}
				/>
				<EditButton style={editBtnStyle} value="Save" onClick={() => setIsEditing(false)} />
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
						deleteTodo(todo._id,todos,todo.id,setTodos);
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
					setTodos((prevTodo) =>
						prevTodo.map((t) => (t.id === todo.id ? { ...t, completed: e.target.checked } : t))
					);
				}}
			/>
			{content}
		</label>
	);
}
