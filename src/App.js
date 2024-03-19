import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom'; 
import CodesList from './components/CodesList';
import AddCode from './components/AddCode';

function App() {
  const [codes, setCodes] = useState([]); 

  const handleNewCode = (newCode) => {
    setCodes([...codes, newCode]);
  };

  return (
    <BrowserRouter> 
      <Routes>
        <Route path="/" element={<CodesList codes={codes} setCodes={setCodes} />} />
        <Route path="/add" element={<AddCode onAddCode={handleNewCode} />} /> 
      </Routes>
    </BrowserRouter>
  );
}

export default App;
