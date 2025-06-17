import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './Login/Components/Login/Login';
import Sidebar from './dashboard/components/Sidebar';
import MainDash from './dashboard/components/MainDash/MainDash';
import RightSide from './dashboard/components/RigtSide/RightSide';
import './App.css';
import { useState } from "react";

function Dashboard() {

  const [selectedSolicitud, setSelectedSolicitud] = useState(null);
  return (
    <div className="App">
      <div className="AppGlass">
        <Sidebar />
        <MainDash
          selectedSolicitud={selectedSolicitud}
        />
        <RightSide
          setSelectedSolicitud={setSelectedSolicitud}
        />
      </div>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
