import React, { useEffect, useState } from 'react';

interface InteresadoData {
  idInteresado: number;
  nombre: string;
  dni: string;
  correo: string;
  telefono?: string;
}

interface Props {
  tipoDocumento: string;
}

const SeccionCentral = ({ tipoDocumento }: Props) => {
  const [interesado, setInteresado] = useState<InteresadoData | null>(null);
  const [fechaActual, setFechaActual] = useState<string>('');

  useEffect(() => {
    // Leer interesado desde localStorage
    const interesadoJSON = localStorage.getItem('interesado');
    let interesadoData: InteresadoData | null = null;

    if (interesadoJSON) {
      try {
        interesadoData = JSON.parse(interesadoJSON);
      } catch (error) {
        console.error('Error al parsear datos del interesado:', error);
      }
    }

    setInteresado(interesadoData);

    // Fecha actual
    const hoy = new Date();
    const dia = hoy.getDate().toString().padStart(2, '0');
    const mes = (hoy.getMonth() + 1).toString().padStart(2, '0');
    const anio = hoy.getFullYear();
    setFechaActual(`${dia}-${mes}-${anio}`);
  }, []);

  if (!interesado) {
    return (
      <div className="seccion-central">
        <h2>DATOS DEL ESTUDIANTE</h2>
        <p>No se encontraron datos del usuario</p>
      </div>
    );
  }

  return (
    <div className="seccion-central">
      <h2>DATOS DEL ESTUDIANTE</h2>
      <div className="datos-estudiante">
        <p><strong>DNI:</strong> {interesado.dni}</p>
        <p><strong>NOMBRE:</strong> {interesado.nombre}</p>
        <p><strong>TELÉFONO:</strong> {interesado.telefono || 'No disponible'}</p>
        <p><strong>PRECIO DEL DOCUMENTO:</strong> 55$</p>
        <p><strong>FECHA DE LA SOLICITUD:</strong> {fechaActual}</p>
        <p><strong>TIPO DE DOCUMENTO:</strong> {tipoDocumento}</p>
      </div>
    </div>
  );
};

export default SeccionCentral;
