import React, { useState } from 'react';
import {  BrowserRouter, Route , Routes} from 'react-router-dom';
import CodesList from './components/CodesList';
import AddCode from './components/AddCode';

function App() {
  const [code, setCode] = useState({
    codeName: '',
    icon: '',
    timer: 0,
  })

  const handleCodeAddition = (codeData) => {
    // Do something with the codeData received from the child component
    console.log('Received code data:', codeData);
    setCode(codeData);
};
  return (
 
  <BrowserRouter>
  <Routes>
    <Route 
    path="/"
    element={<CodesList data={code}/>}
  />
   <Route 
    path="/add"
    element={<AddCode onAddData = {handleCodeAddition}/>}
  />
  </Routes>
  </BrowserRouter>

  );
}

export default App;
