import './App.css';
import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";

import Header from './Components/Header';
import Notes from './Components/Notes';

function App() {
  return (
    <Router>
      <div className='main'>
        <Header />
        <Routes>
          <Route path="/" element={<Notes />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
