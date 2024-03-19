
import React, { useState, useEffect } from 'react'; 

const CodesList = () => {
  const generateCode = () => {
    return Math.floor(Math.random() * 1000000).toString().padStart(6, '0');
  };

  const [codes, setCodes] = useState(() => [ 
  { id: 1, codeName: 'shiwi', icon: '', timer: 50, code: generateCode() },
  { id: 2, codeName: 'runki', icon: '', timer: 60, code: generateCode() },
]);


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


 
  const [formData, setFormData] = useState({ // State for form inputs
    codeName: '',
    icon: '',
    timer: 60
  })

  const addCode = (e) => {
    e.preventDefault();
    const newCode = {
        id: codes.length + 1,
        ...formData,
        code: generateCode(),
        timer: parseInt(formData.timer, 10) 
    };
    setCodes([...codes, newCode]);
    setFormData({ codeName: '', icon: '', timer: 60});
  };

  const onChangeInput = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
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
      <h1>Codes List</h1>
      <ul>
        {codes.map(item => (
          <li key={item.id}>
            <p>Code Name: {item.codeName}</p>
            <p>Icon: {item.icon}</p>
            <p>Timer: {item.timer}</p>
            <p>Code: {item.code}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CodesList;