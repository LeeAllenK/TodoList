import {useState, useEffect} from 'react';
import TodoList from './TodoList.jsx'
import Home from './components/home'
import {TodoContext,SetTodoContext} from './TodosContext';
import { AddButton } from './components/Buttons/AddBtn.jsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import './App.css' 



const TodoApp = () => {
  const [todos, setTodos] = useState(initialTodos);

useEffect(() =>{
  const fetchTodos = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/todos`);
      if(!res.ok) {
        throw new Error(`Error: ${res.status} ${res.statusText}`);
      }
      const data = await res.json();
      setTodos(data)
    } catch(err) {
      console.error('Error fetching todos', err);
    }
  };
  fetchTodos();
},[])


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
  <SetTodoContext.Provider value={setTodos}>
    <h1 className='header'>Todo List</h1>
    <AddButton />
    <TodoList
      getStyle={{cursor: 'pointer'}}
      darkClassName='todo-list'
    />
  </SetTodoContext.Provider>
  </TodoContext.Provider>
  </div>
    </div>
  )
}
export default TodoApp;

const initialTodos = [];

