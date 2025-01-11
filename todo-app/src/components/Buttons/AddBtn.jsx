import {React , useState , useContext} from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleArrowUp } from '@fortawesome/free-solid-svg-icons';
import {TodoDispatchContext} from '../../TodosContext';

let nextId = 1;
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
			e.stopPropagation();
			setText('');
			dispatch({
				type: 'add',
				id: nextId++,
				text: text
			})
		}}
		></FontAwesomeIcon>
		}
    </div>
		
	)
}