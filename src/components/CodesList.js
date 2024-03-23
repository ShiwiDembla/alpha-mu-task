import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AiOutlinePlus } from "react-icons/ai";
import { observer } from 'mobx-react';
import { appStore } from '../mobx/mobx-store';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

import './CodesList.css';

const CodesList = observer(() => {
  const navigate = useNavigate();

  const onDragEnd = (result) => {
    if (!result.destination) return;

    const items = Array.from(appStore.codes);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    appStore.setCodes(items);
  };


  useEffect(() => {
    const intervalId = setInterval(() => {
      appStore.generateNewCode();
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div>
      <header>
        <h1> 2FA Codes </h1>
        <button onClick={() => navigate('/add')}> <AiOutlinePlus /></button>
      </header>

      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="codes">
          {(provided) => (
            <div ref={provided.innerRef} {...provided.droppableProps}>
              {appStore.codes.map((codes, index) => (
                <Draggable
                  key={codes.id}
                  draggableId={codes.id.toString()}
                  index={index}
                >
                  {(provided) => (
                    <>
                      <li
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        ref={provided.innerRef}
                      >

                        <img src={codes.icon} alt={codes.codeName} className='icon' />


                        <div className='text'>
                          <p>{codes.codeName}</p>
                          <p className='code-text'> {codes.code.substring(0, 3)} {codes.code.substring(3)}   </p>

                        </div>

                        <div className='progress-bar'>
                          <CircularProgressbar value={codes.timer} maxValue={60} text={`${codes.timer}s`} />
                        </div>
                      </li>
                    </>

                  )}

                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>


      <div>
        {appStore.codes.map((codes, index) => (
          <div className='demo'>
            <div className='progress-bar'>
              <CircularProgressbar value={codes.timer} maxValue={60} text={`${codes.timer}s`} />
            </div>
          </div>
        ))}
      </div>


    </div>
  );
});

export default CodesList;

