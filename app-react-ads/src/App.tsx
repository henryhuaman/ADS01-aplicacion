import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './Login/Components/Login/Login';
import Sidebar from './dashboardOperadorSubsanaciones/components/Sidebar';
import MainDash from './dashboardOperadorSubsanaciones/components/MainDash/MainDash';
import RightSide from './dashboardOperadorSubsanaciones/components/RigtSide/RightSide';
import SidebarInteresado  from './dashboardInteresado/components/SidebarInteresado'; // Importa el componente
import './App.css';
import './AppInteresado.css';
import { useState } from "react";
import MainContent from './dashboardInteresado/components/MainContentInteresado/MainContent';
import SeccionSuperior from './dashboardInteresado/components/MainContentInteresado/SeccionSuperior';
import SeccionCentral from './dashboardInteresado/components/MainContentInteresado/SeccionCentral';
import SeccionInferior from './dashboardInteresado/components/MainContentInteresado/SeccionInferior';

function DashboardOperadorSubsanaciones() {
  const [selectedSolicitud, setSelectedSolicitud] = useState(null);
  return (
    <div className="App">
      <div className="AppGlass">
        <Sidebar />
        <MainDash selectedSolicitud={selectedSolicitud} />
        <RightSide setSelectedSolicitud={setSelectedSolicitud} />
      </div>
    </div>
  );
}

function DashboardInteresado() {
  return (
    <div className="App-interesado">
      <div className="AppGlass-interesado">
        <div className='sidebar'>
          <SidebarInteresado /> 
        </div>
        <div className="main-content"> {/* Contenedor flexible para las secciones */}
          <MainContent />
        </div>
      </div>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<DashboardOperadorSubsanaciones />} />
        <Route path="/interesado-dashboard" element={<DashboardInteresado />} /> 
      </Routes>
    </BrowserRouter>
  );
}

export default App;