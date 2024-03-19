import React from 'react';
import {  BrowserRouter, Route , Routes} from 'react-router-dom';
import CodesList from './components/CodesList';
import AddCode from './components/AddCode';

function App() {
  return (
 
  <BrowserRouter>
  <Routes>
    <Route 
    path="/"
    element={<CodesList/>}
  />
   <Route 
    path="/add"
    element={<AddCode/>}
  />
  </Routes>
  </BrowserRouter>

  );
}

export default App;
