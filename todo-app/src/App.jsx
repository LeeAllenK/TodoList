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
  const [style, setStyle] = useState("darkgrey");

//Light/Dark Mode  
  const changeColorMode = () => {
    setDarkMode(dark => !dark);
    switch(style) {
      case 'darkgrey':
        document.querySelector('body').style.backgroundColor = style;
        setStyle('white');
        break;
      case 'white':
        document.querySelector('body').style.backgroundColor = style;
        setStyle('darkgrey')
        break;
      default: return style;
    }
  }
return (
  <div className='App'>
    <div>
    <FontAwesomeIcon
     icon={faSun} 
    style={{color: darkMode && 'black', cursor: 'pointer'}}
    onClick={(e) => {
      e.stopPropagation();
      changeColorMode();
    }}
    />
    <h1 className='header' style={{color: darkMode && 'black'}}>Todo List</h1>
  <TodoContext.Provider value={todos}>
  <TodoDispatchContext.Provider value={dispatch}>
    <AddButton />
    <TodoList
      items={todos}
      getStyle={{cursor: 'pointer'}}
      darkStyle={{ color: darkMode && 'black'}}
      darkClassName={darkMode ? 'todo-list-white' : 'todo-list'}
    />
  </TodoDispatchContext.Provider>
  </TodoContext.Provider>
  </div>
    </div>
  )
}
export default TodoApp;

const initialTodos = [];

