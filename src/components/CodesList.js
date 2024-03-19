
import React, {useEffect} from 'react'; 
import { generateCode } from './constants/GenerateCode';
import { useNavigate } from 'react-router-dom';
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
      <h1>Codes List</h1>
      <button onClick={()=>navigate('/add')}> Add</button>
      <ul>
        {codes ? codes.map(item => (
          <li key={item.id}>
            <p>Code Name: {item.codeName}</p>
            <p>Icon: {item.icon}</p>
            <p>Timer: {item.timer}</p>
            <p>Code: {item.code}</p>
          </li>
        )) : "No codes"}
      </ul>
    </div>
  );
};

export default CodesList;