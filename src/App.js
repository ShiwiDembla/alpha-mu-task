import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom'; 
import CodesList from './components/CodesList';
import AddCode from './components/AddCode';

import { appStore } from './mobx/mobx-store'; 

function App() {
  const handleAddCode = (newCode) => {
    console.log("New code added:", newCode);
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<CodesList store={appStore} />} />
        <Route path="/add" element={<AddCode store={appStore} onAddCode={handleAddCode} />} />
      </Routes>
    </BrowserRouter>
  );
}


export default App;
