import { useState } from 'react';
import TeachersList from "../TeacherList/TeachersList";
import BlocksList from '../Blocks/BlocksList';
import './MainDash.css';
import axios from "axios";
import type { BlockData } from '../Blocks/BlocksData';

interface MainDashProps {
  selectedSolicitud: any; // Puedes tiparlo si tienes una interfaz de solicitud
}

const MainDash: React.FC<MainDashProps> = ({ selectedSolicitud, }) => {
  const [selectedTeacherId, setSelectedTeacherId] = useState<number | null>(null);
  const [selectedBlock, setSelectedBlock] = useState<BlockData | null>(null);

  const handleConfirm = () => {
    if (!selectedSolicitud) {
      alert("Por favor, selecciona una solicitud antes de confirmar.");
      return;
    }
    if (!selectedBlock) {
      alert("Seleccione un bloque para continuar.");
      return;
    }

    alert(`Solicitud ${selectedSolicitud.idSolicitud} confirmada exitosamente!. Eres el estudiante ${selectedSolicitud.estudiante.idEstudiante} de profe ${selectedBlock.idProfesor} y ${selectedBlock.idCurso}` );

    const nuevaEvaluacion = {
      idEstudiante: selectedSolicitud.estudiante.idEstudiante, 
      idCurso: selectedBlock.idCurso, 
      idProfesor: selectedBlock.idProfesor,
      notaEvaluacion: 0,
      tipoEvaluacion: "Diferencia Curricular"
    };

    axios.post("http://localhost:3000/evaluaciones", nuevaEvaluacion)
      .then(res => {
        console.log("Evaluación registrada:", res.data);
        alert("✅ Evaluación registrada con éxito");
      })
      .catch(err => {
        console.error("Error al registrar evaluación:", err.response?.data || err.message);
        alert("❌ Error al registrar evaluación");
      });
  };

  return (
    <div className="MainDash">
      <h1>Dashboard</h1>
      <div className="top-section">
        <TeachersList onSelectTeacher={setSelectedTeacherId} />
      </div>
      <section className="section-container">
        <h2>Seleccionar Bloque</h2>
        <div className="blocks-container">
          {selectedTeacherId ? (
            <BlocksList selectedTeacherId={selectedTeacherId} onBlockSelect={(block) => setSelectedBlock(block)}/>
          ) : (
            <p>Selecciona un profesor para ver sus bloques.</p>
          )}
        </div>
      </section>
      <div className="confirm-button-container">
        <button className="confirm-button" onClick={handleConfirm}>CONFIRMAR</button>
      </div>
    </div>
  );
};

export default MainDash;