import {useReducer} from 'react';
import TodoList from './TodoList.jsx'
import TodoReducer from './TodoReducer.jsx'
import Home from './components/home'
import {TodoContext, TodoDispatchContext} from './TodosContext';
import { AddButton } from './components/Buttons/AddBtn.jsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import './App.css' 

const TodoApp = () => {
  const [todos, dispatch] = useReducer(TodoReducer, initialTodos);
return (
  <div className='App'>
    <Home
      style={{cursor: 'pointer'}}  
    >
      <FontAwesomeIcon
        icon={faArrowRightFromBracket}
      />
    </Home>
    <div>
  <TodoContext.Provider value={todos}>
  <TodoDispatchContext.Provider value={dispatch}>
    <h1 className='header'>Todo List</h1>
    <AddButton />
    <TodoList
      items={todos}
      getStyle={{cursor: 'pointer'}}
      darkClassName='todo-list'
    />
  </TodoDispatchContext.Provider>
  </TodoContext.Provider>
  </div>
    </div>
  )
}
export default TodoApp;

const initialTodos = [];

