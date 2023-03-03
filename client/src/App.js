import React from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import AddJob from './components/AddJob';
import './App.css'
import HomePage from './components/HomePage';
import Login from './components/Login/Login';
import Signup from './components/Signup/SignUp'
import ViewJobs from './components/ViewJobs';
import EditJob from './components/EditJob';
import ViewUserJobs from './components/ViewUserJobs';



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
          <Route element={<ViewUserJobs />} path='/viewUserJob/:id' />
          <Route element={<Signup />} path='/Signup'/>
        </Routes>
      </div>  
      </BrowserRouter>
    
  );
}

export default App;
