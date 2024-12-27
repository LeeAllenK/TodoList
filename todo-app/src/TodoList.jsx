import {useState , useContext} from 'react'

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
		
			{items.map((item) => (
				<li
					className={darkClassName} 
				 key={item.id}>	
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
						dispatch({
							type: 'delete',
							id: todo.id
						})
					}}
				/>
			</span>
		)
	}
	return(
		<label className={className} style={style}>
			<div>
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
			</div>
		{content}
		</label>
	)
}