import React, { useState } from 'react';
import SeccionSuperior from './SeccionSuperior';
import SeccionCentral from './SeccionCentral';
import SeccionInferior from './SeccionInferior';
import './MainContent.css';

const MainContent = () => {
  const [tipoDocumento, setTipoDocumento] = useState<'CERTIFICADO' | 'CONSTANCIA'>(
    () => (localStorage.getItem('tipoDocumento') as 'CERTIFICADO' | 'CONSTANCIA') || 'CERTIFICADO'
  );

  const handleTipoDocumento = (nuevoTipo: 'CERTIFICADO' | 'CONSTANCIA') => {
    setTipoDocumento(nuevoTipo);
    localStorage.setItem('tipoDocumento', nuevoTipo); // sigue guardando para persistencia
  };

  return (
    <div className="main-content">
      <SeccionSuperior tipoDocumento={tipoDocumento} setTipoDocumento={handleTipoDocumento} />
      <SeccionCentral tipoDocumento={tipoDocumento} />
      <SeccionInferior />
    </div>
  );
};

export default MainContent;
