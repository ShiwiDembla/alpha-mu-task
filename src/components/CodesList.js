import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AiOutlinePlus } from "react-icons/ai";
import { observer } from 'mobx-react';
import { appStore } from '../mobx/mobx-store';
import './CodesList.css';

const CodesList = observer(() => {
  const navigate = useNavigate();
  const [draggedIndex, setDraggedIndex] = useState(null);

  useEffect(() => {
    const intervalId = setInterval(() => {
      appStore.generateNewCode();
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  const handleDragStart = (e, index) => {
    e.dataTransfer.setData('index', index);
    setDraggedIndex(index);
  };

  const handleDragOver = (e, index) => {
    e.preventDefault();
    if (draggedIndex === null || index === draggedIndex) return;
    const codesCopy = [...appStore.codes];
    const draggedItem = codesCopy.splice(draggedIndex, 1)[0];
    codesCopy.splice(index, 0, draggedItem);
    appStore.setCodes(codesCopy);
    setDraggedIndex(index);
  };

  return (
    <div>
      <header>
        <h1> 2FA Codes </h1>
        <button onClick={() => navigate('/add')}> <AiOutlinePlus /></button>
      </header>

      <div>
        <ul>
          {appStore.codes.map((code, index) => (
            <li
              key={code.id}
              draggable
              className='draggable'
              onDragStart={(e) => handleDragStart(e, index)}
              onDragOver={(e) => handleDragOver(e, index)}
              onDrop={(e) => handleDragOver(e, index)}
            >
              <img src={code.icon} alt={code.codeName} className='icon' />
              <div className='text'>
                <p>{code.codeName.charAt(0).toUpperCase()  + code.codeName.slice(1)}</p>
                <p className='code-text'> {code.code.substring(0, 3)} {code.code.substring(3)} </p>
              </div>
              <div className='progress-bar'>
              
                <svg
                  width="60" height="60" viewBox="0 0 250 250"
                  className="circular-progress" style={{ "--progress": code.timer }}
                >
                  
                  <circle className="bg"></circle>
                  <circle className="fg">
               
                  </circle>
                  <text
                    x="50%"
                    y="50%"
                    dominantBaseline="middle"
                    textAnchor="middle"
                  >{code.timer}</text>
                  
                </svg>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
});

export default CodesList;
