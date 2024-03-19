import React, { useEffect } from 'react'; 
import { useNavigate } from 'react-router-dom';
import { AiOutlinePlus } from "react-icons/ai";
import { observer } from 'mobx-react';
import { appStore } from '../mobx/mobx-store'; 
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

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
            {/* <p> {item.timer}</p> */}
            <div className='progress-bar'>
              <CircularProgressbar value={item.timer} maxValue={60} text={`${item.timer}s`} />
            </div>


            
          </li>
        )) : "No codes"}
      
      </ul>
    </div>
  );
});

export default CodesList;
