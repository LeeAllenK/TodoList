import {useState} from 'react'

import { EditButton } from './components/Buttons/EditBtn.jsx';
import { TrashButton } from './components/Buttons/DelBtn.jsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';

export default function TodoList({items , onEdit, onDeleteClick,darkClassName, darkStyle , todoStyle , getClass, getStyle}){

	return(
		<ul className={'ul-list'} >
			{items.map((item , index) => (
				<li
					className={darkClassName} 
				 key={item.id}>	
					<Todos todo={item} editStyle={todoStyle} style={darkStyle}editBtnStyle={getStyle} className={getClass} onChange={onEdit} onDelete={onDeleteClick}/> 
				</li>
			))}	
		</ul>
	)
}

function Todos({ todo, onChange,onDelete,style, editBtnStyle,className}){
	const [isEditing , setIsEditing] = useState(false);
	let content;
	if(isEditing){
		content = (
			<span>
				<input
				className='inputText'
				type='text'
				value={todo.text}
					onChange={(e) => {
						onChange({
						...todo,
						text: e.target.value	
					})
				}}
				/>
				{' '}
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
					onClick={() => onDelete(todo.id)}
				/>
			</span>
		)
	}
	return(
		<label className={className} style={style}>
			<input
				type="checkbox"
				checked={todo.completed}
				onChange={(e) => {
					onChange({
						...todo,
						completed: e.target.checked,
					});
				}}
			/>
		{content}
		{' '}
		</label>
	)
}