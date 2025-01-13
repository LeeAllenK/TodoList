import {useState , useContext} from 'react';
import { EditButton } from './components/Buttons/EditBtn.jsx';
import { TrashButton } from './components/Buttons/DelBtn.jsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import {TodoContext , TodoDispatchContext} from './TodosContext';

export default function TodoList({ darkClassName, darkStyle , todoStyle , getClass, getStyle}){

	const items = useContext(TodoContext);
	console.log('ARRAy',items)
	return(
	<div className='ul-Border'>
		<ul className={'ul-list'} >
		
			{items.map((item,index) => (
				<li
					className={darkClassName} 
				 key={index}>	
					<Todos todo={item} editStyle={todoStyle} style={darkStyle}editBtnStyle={getStyle} className={getClass} /> 
				</li>
			))}	
		</ul>
	</div>
	)
}
const deleteTodo = async (id,dispatch) => {
		console.log('ID DELETED',id);
		try{
			const res = await fetch(`${import.meta.env.VITE_API_URL}/todos/${id}`, { method: 'DELETE'});
			const data = await res.json();
			console.log('del',data)
			if(!data)console.log('No Data')
			dispatch({
				type: 'delete',
				id
			});
		}catch(err){
			console.error({message: 'Problem with deleting item'});
		}
	};
function Todos({ todo, style, editBtnStyle,className}){
	const [isEditing , setIsEditing] = useState(false);
	const dispatch = useContext(TodoDispatchContext);
		console.log('Todo Object:',todo)
	let content;
	if(isEditing){
		content = (
			<span>
				<input
				className='inputText'
				type='text'
				value={todo.text}
					onChange={() => {
						
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
					delClick={() => {
						console.log('Deleting todo with id:', todo._id);
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
				onChange={() => {
					
				}}
			/>
		{content}
		</label>
	)
}