export default function TodoReducer(todos, action) {
	switch(action.type) {
		case 'set':
			return action.todos;
		case 'add':
			return [
				...todos,
				{
					id: action.id,
					text: action.text,
					completed: false
				}
			];
		case 'edit': {
			console.log(action.id)
			
		}
		case 'delete': {
			console.log(todos.filter(todo => todo._id));
			console.log(action.id)
			if(!action.id)console.log('NO ID DETECTED')
		 	return todos.filter(todo => todo._id !== action.id);
		}
		default: {
			throw new Error('Unknown action: ' + action.type);
		}
	}
}
