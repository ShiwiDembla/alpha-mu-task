import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { generateCode } from './constants/GenerateCode';

const AddCode = ({ onAddCode }) => {
  const [codes, setCodes] = useState(() => [
    {
      id: 1,
      codeName: 'Default',
      icon: 'Default Icon',
      timer: 60,
      code: generateCode()
    }
  ]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCodes(prevCodes => (
        prevCodes.map(code => {
          if (code.timer > 0) {
            return { ...code, timer: code.timer - 1 };
          } else {
            return { ...code, code: generateCode(), timer: 60 };
          }
        })
      ));
    }, 1000);
  
    return () => clearInterval(intervalId);
  }, []);
  

  const [formData, setFormData] = useState({ // State for form inputs
    codeName: '',
    icon: '',
    timer: 60
  });

  const navigate = useNavigate();

  const onChangeInput = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const addCode = (e) => {
    e.preventDefault();
    const newCode = {
      id: codes.length + 1,
      ...formData,
      code: generateCode(),
      timer: parseInt(formData.timer, 10) 
    };
    setCodes([...codes, newCode]);
    setFormData({ codeName: '', icon: '', timer: 60 });
    onAddCode(newCode); // Pass the newly added code to the parent component
    navigate('/'); // Navigate to the home page
  };

  return (
    <div>
      <form onSubmit={addCode}>
        <input
          type="text"
          name='codeName'
          value={formData.codeName} // Bind to form state
          onChange={onChangeInput}
          placeholder="Name of the app"
        />
        <input
          type="text"
          name='icon'
          value={formData.icon}
          onChange={onChangeInput}
          placeholder="Icon"
        />
        <button type="submit">Add</button>
      </form>
    </div>
  );
};

export default AddCode;
