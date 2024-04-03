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
    <div data-testid="codes-list">
      <header>
        <h1> 2FA Codes </h1>
        <button
          data-testid="add"
          onClick={() => navigate('/add')}
        >
          <AiOutlinePlus />
        </button>

      </header>

      <div>
        <ul>
          {appStore.codes ?

            appStore.codes.length <= 0 ?

              <>
                <p data-testid="empty"> No codes found</p>
              </>
              :
              appStore.codes.map((code, index) => (
                <li
                  key={code.id}
                  draggable
                  data-testid="listitem"
                  aria-label='listitem'
                  className='draggable'
                  onDragStart={(e) => handleDragStart(e, index)}
                  onDragOver={(e) => handleDragOver(e, index)}
                  onDrop={(e) => handleDragOver(e, index)}
                >
                  <img data-testid="icon" src={code.icon} alt={code.codeName} className='icon' />
                  <div className='text'>
                    <p data-testid="name">{code.codeName.charAt(0).toUpperCase() + code.codeName.slice(1)}</p>
                    <p data-testid="code" className='code-text'>{code.code.substring(0, 3)} {code.code.substring(3)}</p>
                  </div>

                  <div
                    data-testid="progress-bar"
                    className='progress-bar'>
                    <svg
                      data-testid="progress-svg"
                      width="60" height="60" viewBox="0 0 250 250"
                      className="circular-progress" style={{ "--progress": code.timer }}
                    >

                      <circle className="bg" aria-label='bg-circle'></circle>
                      <circle className="fg" aria-label='fg-circle'>

                      </circle>
                      <text
                        x="50%"
                        y="50%"
                        dominantBaseline="middle"
                        textAnchor="middle"
                        data-testid="timer"
                      >{code.timer}</text>

                    </svg>
                  </div>
                </li>
              ))

            : null}
        </ul>
      </div>
    </div>
  );
});

export default CodesList;
