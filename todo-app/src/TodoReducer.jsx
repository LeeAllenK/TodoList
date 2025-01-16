
export function TodoReducer(todos, action) {
	switch(action.type) {
		case 'set':
			return action.todos;
		case 'add': {
			return [
				...todos,
				{ id: action.id, text: action.text, completed: false,email: action.email}
			];
		}
		case 'edit': {
			console.table('action', action, todos.map(t => t));
			return todos.map((t) => (t._id === action.id || t.id === action.id) ? { ...t, text: action.text, completed: false} : t);
		}
		case 'delete':
			return todos.filter((t) => t._id !== action.id);
		default:
			return todos;
	}
}
