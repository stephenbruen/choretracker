import React from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import AddJob from './components/AddJob';
import './App.css'
import HomePage from './components/HomePage';

function App() {
  return (
    <BrowserRouter>
    <div className="App">
        <Routes>
          <Route element={<AddJob />} path='/addjob' />
          <Route element={<HomePage />} path ='/home' />
        </Routes>
      </div>  
      </BrowserRouter>
    
  );
}

export default App;
