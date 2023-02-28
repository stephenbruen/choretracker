import React from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import AddJob from './components/AddJob';
import './App.css'
import HomePage from './components/HomePage';
import Login from './components/Login';
import Signup from './components/SignUp'
import ViewJobs from './components/ViewJobs';
import EditJob from './components/EditJob';

function App() {
  return (
    <BrowserRouter>
    <div className="App">
        <Routes>
          <Route element={<AddJob />} path='/addjob' />
          <Route element={<HomePage />} path='/home' />
          <Route element={<Login />} path='/' />
          <Route element={<Signup />} path='/register' />
          <Route element={<ViewJobs />} path='/view/:id' />
          <Route element = {<EditJob/>} path = '/edit/:id'/>
        </Routes>
      </div>  
      </BrowserRouter>
    
  );
}

export default App;
