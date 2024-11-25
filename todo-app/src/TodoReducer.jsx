
export default function TodoReducer(todos, action) {
	switch(action.type) {
		case 'add': {
			return [
				...todos,
				{
					id: action.id,
					text: action.text,
					completed: false
				}
			]
		}
		case 'edit': {
			
			console.log(action.id)
			return todos.map((t) => {
				if(t.id === action.todo.id) {
					return action.todo
				} else return t;
			})
		}
		case 'delete': {
			return todos.filter((t) => t.id !== action.id)
		}
		default: {
			throw Error('Unknown action: ' + action.type);
		}
	}
}
