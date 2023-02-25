
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import AddJob from './components/AddJob';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route element={<AddJob />} path='/addjob' />
        </Routes>
      </BrowserRouter>

    </div>
  );
}

export default App;
