import React from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import AddJob from './components/AddJob';
import './App.css'
import HomePage from './components/HomePage';
import Login from './components/Login';
import Signup from './components/SignUp'

function App() {
  return (
    <BrowserRouter>
    <div className="App">
        <Routes>
          <Route element={<AddJob />} path='/addjob' />
          <Route element={<HomePage />} path='/home' />
          <Route element={<Login />} path='/login' />
          <Route element={<Signup />} path='/register' />
        </Routes>
      </div>  
      </BrowserRouter>
    
  );
}

export default App;
