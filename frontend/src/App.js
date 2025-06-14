import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import MainDash from './dashboard/components/MainDash/MainDash';
import RightSide from './dashboard/components/RigtSide/RightSide';
import Sidebar from './dashboard/components/Sidebar';
import Login from './Login/Components/Login/Login'; // Ruta al Login.jsx

function Dashboard() {
  return (
    <div className="App">
      <div className="AppGlass">
        <Sidebar/>
        <MainDash/>
        <RightSide/>
      </div>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
