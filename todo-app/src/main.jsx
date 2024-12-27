import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './App.css'
import Signin from './components/signIn'
const root = createRoot(document.getElementById('root'))
root.render(
  <StrictMode>
    <Signin/>
  </StrictMode>
)