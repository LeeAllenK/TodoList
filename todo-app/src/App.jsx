import { useState, useReducer} from 'react';

import TodoList from './TodoList.jsx'
import TodoReducer from './TodoReducer.jsx'
import {TodoContext, TodoDispatchContext} from './TodosContext';

import { AddButton } from './components/Buttons/AddBtn.jsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSun } from '@fortawesome/free-solid-svg-icons';

import './App.css' 

let nextId = 1;

const TodoApp = () => {

  const [todos, dispatch] = useReducer(TodoReducer, initialTodos);
  const [darkMode , setDarkMode] = useState(false)
  const [style, setStyle] = useState("black");

//Light/Dark Mode 
  const changeLightMode = () => {
    switch(style){
      case 'black':
      document.querySelector('body').style.backgroundColor = style;
      setStyle('white');
       break;
      case 'white':
        document.querySelector('body').style.backgroundColor = style;
        setStyle('black')
        break;
        default: return style;
      }
  }   
  const changeColorMode = () => {
    setDarkMode(dark => !dark);
  }

return (
  <div className='App'>
    <div>
    <FontAwesomeIcon
     icon={faSun} 
    style={{color: darkMode ? 'white' : 'black', cursor: 'pointer'}}
    onClick={(e) => {
      e.stopPropagation();
      changeColorMode();
      changeLightMode();
    }}
    />
    <h1 className='header' style={{color: darkMode ? 'white' : 'black'}}>Todo List</h1>
  
  <TodoContext.Provider value={todos}>
  <TodoDispatchContext.Provider value={dispatch}>
    <AddButton />
    <TodoList
      items={todos}
      getStyle={{cursor: 'pointer'}}
      darkStyle={{ color: darkMode ? 'white ' : 'black'}}
      darkClassName={darkMode ? 'todo-list-white' : 'todo-list'}
    />
  </TodoDispatchContext.Provider>
  </TodoContext.Provider>
  </div>
    </div>
  )
}
export default TodoApp;

const initialTodos = [

  { id: 0, text: 'React Developer', completed: false },

];

