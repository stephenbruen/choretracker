import React from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import AddJob from './components/AddJob';
import SignUp from './components/SignUp';
import Login from './components/Login';
import './App.css';


function App() {
  return (
    <BrowserRouter>
    <div className="App">
        <Routes>
          <Route element={<AddJob />} path='/addjob' />
          <Route element = {<SignUp/>} path = '/register'/>
          <Route element = {<Login/>} path = '/login' />
        </Routes>
      </div>  
      </BrowserRouter>
    
  );
}

export default App;
