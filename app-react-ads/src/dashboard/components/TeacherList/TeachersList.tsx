import React, { useEffect, useState } from "react";
import axios from "axios";
import "./TeachersList.css";
import img1 from "../../imgs/teacher.jpg";
import img2 from "../../imgs/teacher1.jpg";

interface Teacher {
  idProfesor: number;
  nombreProfesor: string;
  apellidoProfesor: string;
  correoProfesor: string;
  estadoProfesor: string;
}

const ChevronLeft: React.FC = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="#4a148c">
    <path d="M15.41 16.59L10.83 12l4.58-4.59L14 6l-6 6 6 6 1.41-1.41z" />
  </svg>
);

const ChevronRight: React.FC = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="#4a148c">
    <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z" />
  </svg>
);

interface TeachersListProps {
  onSelectTeacher: (id: number) => void;
}
const TeachersList: React.FC<TeachersListProps> = ({ onSelectTeacher }) => {
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [selectedTeacher, setSelectedTeacher] = useState<number | null>(null);

  useEffect(() => {
    axios.get("http://localhost:3000/profesores")
      .then((res) => {
        console.log("Profesores cargados:", res.data);
        setTeachers(
          res.data.map((p: any, index: number) => ({
            ...p,
            photo: index % 2 === 0 ? img1 : img2, // alterna imagen
          }))
        );
      })
      .catch((err) => {
        console.error("Error al cargar profesores:");
        console.error("Mensaje:", err.message);
        if (err.response) {
          console.error("Código:", err.response.status);
          console.error("Respuesta:", err.response.data);
        }
      });
  }, []);



  const visibleTeachers = teachers.slice(currentIndex, currentIndex + 2);
  const canGoNext = currentIndex + 2 < teachers.length;
  const canGoPrev = currentIndex > 0;

  const next = () => {
    if (canGoNext) setCurrentIndex((prev) => prev + 1);
  };

  const prev = () => {
    if (canGoPrev) setCurrentIndex((prev) => prev - 1);
  };

  const getLocalImage = (index: number): string => {
    return index % 2 === 0 ? img1 : img2;
  };

  return (
    <div className="teachers-container">
      <h3>Seleccionar Profesor</h3>
      <div className="teachers-slider">
        <button className="nav-button prev" onClick={prev} disabled={!canGoPrev}>
          <ChevronLeft />
        </button>

        <div className="teachers-grid">
          {visibleTeachers.map((teacher, index) => (
            <div
              key={teacher.idProfesor}
              className={`teacher-card ${selectedTeacher === teacher.idProfesor ? "selected" : ""}`}
              onClick={() => {
              setSelectedTeacher(teacher.idProfesor);
              onSelectTeacher(teacher.idProfesor); // <-- ¡Esto notifica al MainDash!
            }}
            >
              <div className="teacher-photo">
                <img src={getLocalImage(index + currentIndex)} alt={teacher.nombreProfesor} />
              </div>
              <div className="teacher-info">
                <h4>{teacher.nombreProfesor} {teacher.apellidoProfesor}</h4>
                <p>{teacher.estadoProfesor}</p>
              </div>
            </div>
          ))}
        </div>

        <button className="nav-button next" onClick={next} disabled={!canGoNext}>
          <ChevronRight />
        </button>
      </div>
    </div>
  );
};

export default TeachersList;
