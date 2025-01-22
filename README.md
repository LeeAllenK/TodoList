<div id="header" >
 <h1  class="heading-element" dir="auto">Todo List</h1>
 <img src="https://i.imgur.com/VLBniiy.gif" alt="gif not available">
  A todo list with the ability to add , edit and delete the users input.
</div>

<div id="header" >
 <h1 class="heading-element" dir="auto">How It's Made:</h1>
 Tech used: HTML, CSS, JavaScript, React, Vite<br/><br/>
 This app allows users to add, edit, and delete tasks, utilizing useReducer to consolidate event handlers and state logic. It also features a light and dark mode to enhance the user   experience.Additionally, useContext was implemented to demonstrate the value of using hooks instead of props for passing values.
</div>

<div id="header" >
 <h1 class="heading-element" dir="auto">Optimizations:</h1>
  Plan to create a backend to handle user authentication and data storage in future updates.
</div>

<div id="header" >
 <h1 class="heading-element" dir="auto">Installation:</h1>
 1. git clone repo.<br/>
3. npm install<br/>
4. npm install dotenv in root folder<br/>
2. create project navigate https://firebase.google.com
5. Create .env file inside root folder
6. Inside .env add text VITE_API_KEY='${API_KEY}'
7. naviagate to components/firebase.jsx add your VITE_API_KEY like so "import.meta.env.VITE.API_KEY"
8. 
</div>

<div id="header">
 <h1 class="heading-element" dir="auto">Lessons Learned:</h1>
Although the app isn't large enough to necessitate the use of useContext, implementing it to pass values instead of props was valueable to handle prop drilling and troubleshoot bugs. This application demostrates the benefits of using hooks for state management and improved the overall structure of the app. Also utilizing useReducer allows for better readability of event handlers since each function is its own function.
</div>
