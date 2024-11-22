import { useState, useReducer } from 'react';

import TodoList from './TodoList.jsx'
import TodoReducer from './TodoReducer.jsx'
// import { SubmitButton } from './SubmitButton';
import { AddButton } from './components/Buttons/AddBtn.jsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSun } from '@fortawesome/free-solid-svg-icons';
import {faCircleArrowUp} from '@fortawesome/free-solid-svg-icons';


import './App.css' 
// import Home from './googleSignin/Home'
let nextId = 1;

const TodoApp = () => {
  //state used for reminders
  const [todos, dispatch] = useReducer(TodoReducer, initialTodos);
  const [text, setText] = useState('');
  const [darkMode , setDarkMode] = useState(false)
  const [style, setStyle] = useState("black");


  const handleAdd = () => {
    dispatch({
      type: 'add',
      id: nextId++,
      text: text,
      completed: false
    })
    setText('');
  }
  const handleEdit = (todo) => {
    dispatch({
      type: 'edit',
      todo: todo
    })
  }
  const handleDelete = (todoId) => {
    dispatch({
      type: 'delete',
      id: todoId
    })
  }
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
    <div className='inputBorder'>
    <input
      className='inputText'
      type='text'
      value={text}
      onChange={(e) => setText(e.target.value)}
    />
   {text.length > 0 && 
    <AddButton onClick={handleAdd}/>
 }
    </div>
    <TodoList
      items={todos}
      onEdit={handleEdit}
      onDeleteClick={handleDelete}
      getStyle={{cursor: 'pointer'}}
      darkStyle={{ color: darkMode ? 'white ' : 'black'}}
      darkClassName={darkMode ? 'todo-list-white' : 'todo-list'}
    />
  </div>
    </div>
  )
}
export default TodoApp;

const initialTodos = [

  { id: 0, text: 'React Developer', completed: false },

];

