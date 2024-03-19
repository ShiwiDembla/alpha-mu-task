import React, { useEffect } from 'react'; 
import { useNavigate } from 'react-router-dom';
import { AiOutlinePlus } from "react-icons/ai";
import { observer } from 'mobx-react';
import { appStore } from '../mobx/mobx-store'; 

import './CodesList.css';

const CodesList = observer(() => {
  const navigate = useNavigate();

  useEffect(() => {
    const intervalId = setInterval(() => {
      appStore.generateNewCode(); 
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div>
      <header>
        <h1>Codes List</h1>
        <button onClick={() => navigate('/add')}> <AiOutlinePlus/></button>
      </header>
    
      <ul>
        {appStore.codes.length > 0 ? appStore.codes.map(item => (
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
});

export default CodesList;
