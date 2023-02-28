import React from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import AddJob from './components/AddJob';
import './App.css'
import HomePage from './components/HomePage';
import Login from './components/Login';
import Signup from './components/SignUp'
import ViewJobs from './components/ViewJobs';

function App() {
  return (
    <BrowserRouter>
    <div className="App">
        <Routes>
          <Route element={<AddJob />} path='/addjob' />
          <Route element={<HomePage />} path='/home' />
          <Route element={<Login />} path='/login' />
          <Route element={<Signup />} path='/register' />
          <Route element={<ViewJobs />} path='/view/:id' />
        </Routes>
      </div>  
      </BrowserRouter>
    
  );
}

export default App;
