import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface ProgramaFormativo {
  idPrograma: number;
  nombrePrograma: string;
  descripcion?: string;
}

const SeccionInferior = () => {
  const [programas, setProgramas] = useState<ProgramaFormativo[]>([]);
  const [programaSeleccionado, setProgramaSeleccionado] = useState<string>('');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const interesadoJSON = localStorage.getItem('interesado');
    if (!interesadoJSON) {
      setError('No se encontró el interesado en localStorage');
      return;
    }

    let interesado;
    try {
      interesado = JSON.parse(interesadoJSON);
    } catch (e) {
      setError('Error al parsear el interesado');
      return;
    }

    const idInteresado = interesado.idInteresado;

    axios
      .get(`http://localhost:3000/interesados-pf/interesado/${idInteresado}`)
      .then((res) => {
        setProgramas(res.data);
      })
      .catch((err) => {
        console.error('Error al obtener programas:', err);
        setError('No se pudieron cargar los programas formativos');
      });
  }, []);

  const handleConfirmar = async () => {
    if (!programaSeleccionado) {
      alert('Debes seleccionar un programa');
      return;
    }

    const interesadoJSON = localStorage.getItem('interesado');
    const tipoDocumento = localStorage.getItem('tipoDocumento') || 'CERTIFICADO';

    if (!interesadoJSON) {
      alert('No se encontró información del interesado');
      return;
    }

    let interesado;
    try {
      interesado = JSON.parse(interesadoJSON);
    } catch (e) {
      alert('Error al leer el interesado');
      return;
    }

    const nuevaSolicitud = {
      idInteresado: interesado.idInteresado,
      idProgramaFormativo: parseInt(programaSeleccionado),
      fechaSolicitudEgresado: new Date(),
      documentoSolicitado: tipoDocumento,
      estadoTramite: 'PENDIENTE',
      observacionSolicitud: 'ninguna',
    };

    try {
      const res = await axios.post('http://localhost:3000/solicitudint', nuevaSolicitud);
      console.log('Solicitud creada:', res.data);
      alert('✅ Solicitud enviada con éxito');
      setProgramaSeleccionado('');
    } catch (err) {
      console.error('Error al crear solicitud:', err);
      alert('❌ No se pudo enviar la solicitud');
    }
  };

  return (
    <div className="seccion-inferior">
      <h2>SELECCIONAR PROGRAMA FORMATIVO</h2>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      <div className="selector-programa">
        <select
          className="programa-select"
          value={programaSeleccionado}
          onChange={(e) => setProgramaSeleccionado(e.target.value)}
        >
          <option value="">ELEGIR PROGRAMA FORMATIVO</option>
          {programas.map((programa) => (
            <option key={programa.idPrograma} value={programa.idPrograma}>
              {programa.nombrePrograma}
            </option>
          ))}
        </select>
      </div>

      <button className="confirmar-btn" onClick={handleConfirmar}>
        CONFIRMAR
      </button>
    </div>
  );
};

export default SeccionInferior;
