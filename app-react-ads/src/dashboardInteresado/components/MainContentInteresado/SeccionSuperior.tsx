import React from 'react';

interface Props {
  tipoDocumento: 'CERTIFICADO' | 'CONSTANCIA';
  setTipoDocumento: (tipo: 'CERTIFICADO' | 'CONSTANCIA') => void;
}

const SeccionSuperior = ({ tipoDocumento, setTipoDocumento }: Props) => {
  return (
    <div className="seccion-superior">
      <h2>SELECCIONAR OPCIÓN</h2>
      <div className="opciones">
        <button
          className={`opcion-btn ${tipoDocumento === 'CERTIFICADO' ? 'active' : ''}`}
          onClick={() => setTipoDocumento('CERTIFICADO')}
        >
          CERTIFICADO
        </button>
        <button
          className={`opcion-btn ${tipoDocumento === 'CONSTANCIA' ? 'active' : ''}`}
          onClick={() => setTipoDocumento('CONSTANCIA')}
        >
          CONSTANCIA
        </button>
      </div>
    </div>
  );
};

export default SeccionSuperior;
