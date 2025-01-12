import {useState , useContext} from 'react';
import { EditButton } from './components/Buttons/EditBtn.jsx';
import { TrashButton } from './components/Buttons/DelBtn.jsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import {TodoContext , TodoDispatchContext} from './TodosContext';

export default function TodoList({ darkClassName, darkStyle , todoStyle , getClass, getStyle}){

	const items = useContext(TodoContext);
	return(
	<div className='ul-Border'>
		<ul className={'ul-list'} >
		
			{items.map((item,index) => (
				<li
					className={darkClassName} 
				 key={index}>	
					<Todos todo={item}editStyle={todoStyle} style={darkStyle}editBtnStyle={getStyle} className={getClass} /> 
				</li>
			))}	
		</ul>
	</div>
	)
}




function Todos({ todo, style, editBtnStyle,className}){
	const [isEditing , setIsEditing] = useState(false);
	const dispatch = useContext(TodoDispatchContext);

	const deleteTodo = async (id) => {
		console.log('Deleting todo with ID:', id); // Log the ID
		try {
			const res = await fetch(`${import.meta.env.VITE_API_URL}/todos/${id}`, {
				method: 'DELETE',
			});
			if(!res.ok) {
				throw new Error(`Error: ${res.status} ${res.statusText}`);
			}
			dispatch({ type: 'delete', id });
		} catch(err) {
			console.error('Todo not deleted', err);
		}
	};
	let content;
	if(isEditing){
		content = (
			<span>
				<input
				className='inputText'
				type='text'
				value={todo.text}
					onChange={(e) => {
						dispatch({
							type: 'edit',
						todo:{
							...todo,
							text: e.target.value
						}	
					})
				}}
				/>
			<EditButton style={editBtnStyle} value="Save" onClick={() => setIsEditing(false)}/>
			</span>
		)
	}else{
		content = (
			<span>
			{todo.text}
			{' '}
			<FontAwesomeIcon
			icon={faPenToSquare} 
			value='Edit' 
			style={{cursor: 'pointer'}}
			onClick={() => setIsEditing(true)}		
			/>
			
				<TrashButton
					style={{ cursor: 'pointer' }}
					onClick={() => {
						deleteTodo(todo._id ,dispatch)
					}}
				/>
			</span>
		)
	}
	return(
		<label className={className} style={style}>
			<input className='checkbox-container'
				type="checkbox"
				checked={todo.completed}
				onChange={(e) => {
					e.stopPropagation();
					dispatch({
						type: 'edit',
						todo:{
						...todo,
						completed: e.target.checked,
						}
					});
					
				}}
			/>
		{content}
		</label>
	)
}