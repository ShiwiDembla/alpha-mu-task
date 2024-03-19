import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom'

import './CodesList.css'
const CodesList = (props)  => {
  const navigate = useNavigate()
const addCode = () => {
  console.log('add code')
  navigate('/add')
 
}

  return (
    <>
      <header>
        <h1>Codes List</h1>
        {/* icon */}
        <button onClick={addCode} >Add </button>
      </header>
      <main>
        <ul>
          <li>
            <p> Code name:{props.data.codeName}</p>
            <p>Icon:{props.data.icon}</p>
            <p> Timer: {props.data.timer} </p>
          </li>
          
        </ul>
      </main>
    </>
  )
}
export default CodesList
