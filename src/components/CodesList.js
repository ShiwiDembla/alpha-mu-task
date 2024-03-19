
import React, {useEffect} from 'react'; 
import { generateCode } from './constants/GenerateCode';
import { useNavigate } from 'react-router-dom';
import { AiOutlinePlus } from "react-icons/ai";

import './CodesList.css';


const CodesList = ({ codes, setCodes }) => {
  const navigate = useNavigate();


useEffect(() => {
  const intervalId = setInterval(() => {
    setCodes(prevCodes => prevCodes.map(code => {
      if (code.timer > 0) {
        return { ...code, timer: code.timer - 1 };
      } else {
        return { ...code, code: generateCode(), timer: 60 }; 
      }
    }));
  }, 1000);

  return () => clearInterval(intervalId);
}, []); 

  return (
    <div>
      <header>
      <h1>Codes List</h1>
      <button onClick={()=>navigate('/add')}> <AiOutlinePlus/></button>
      </header>
      <ul>
        {codes ? codes.map(item => (
          <li key={item.id}>
            <p>{item.icon}</p>
            <div className='code-text'>
            <p> {item.codeName}</p>
            <p> {item.code}</p>
            </div>
            <p> {item.timer}</p>
            
          </li>
        )) : "No codes"}
      </ul>
    </div>
  );
};

export default CodesList;