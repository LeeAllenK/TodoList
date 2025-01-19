<<<<<<< HEAD
import {useReducer} from 'react';
import TodoList from './TodoList.jsx';
import TodoReducer from './TodoReducer.jsx';
import Home from './components/home';
import {TodoContext, TodoDispatchContext} from './TodosContext';
=======
import { useState, useEffect, useReducer } from 'react';
import TodoList from './TodoList.jsx';
import Home from './components/home';
import { TodoReducer } from './TodoReducer';
import { TodoContext, TodoDispatchContext, EmailContext } from './TodosContext';
>>>>>>> secondary
import { AddButton } from './components/Buttons/AddBtn.jsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import './App.css';

const TodoApp = () => {
  const [todos, dispatch] = useReducer(TodoReducer, initialTodos);
  const [email, setEmail] = useState('');
  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/todos`);
        if(!res.ok) {
          throw new Error(`Error: ${res.status} ${res.statusText}`);
        }
        const data = await res.json();
        dispatch({ type: 'set', todos: data });
      } catch(err) {
        console.error('Error fetching todos', err);
      }
    };
    fetchTodos();
  }, []);

  useEffect(() => {
    const storedEmail = localStorage.getItem('email');
    if(storedEmail) {
      setEmail(storedEmail);
    }
  }, []);
  return (
    <div className='App'>
      <Home style={{ cursor: 'pointer' }}>
        <FontAwesomeIcon icon={faArrowRightFromBracket} />
      </Home>
      <div>
        <TodoContext.Provider value={todos}>
        <TodoDispatchContext.Provider value={dispatch}>
        <EmailContext.Provider value={email}>
            <h1 className='header'>Todo List</h1>
            <AddButton/>
            <TodoList getStyle={{ cursor:'pointer'}} darkClassName='todo-list'/>
        </EmailContext.Provider>
        </TodoDispatchContext.Provider>
        </TodoContext.Provider>
      </div>
    </div>
  );
};
export default TodoApp;

const initialTodos = [];
