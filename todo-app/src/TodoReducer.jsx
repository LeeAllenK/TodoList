
export function TodoReducer(todos, action) {
	switch(action.type) {
		case 'set':
			return action.todos;
		case 'add': {
			console.log('addAction',action)
			return [
				...todos,
				{ id: action.id, text: action.text, completed: false, email: action.email}
			];
		}
		case 'edit': {
			console.table('editAction', action);
			return todos.map((t) => (t._id === action.id || t.id === action.id) ? { ...t, text: action.text, completed: false,email: action.email} : t);
		}
		case 'delete':
			return todos.filter((t) => t._id !== action.id);
		default:
			return todos;
	}
}
