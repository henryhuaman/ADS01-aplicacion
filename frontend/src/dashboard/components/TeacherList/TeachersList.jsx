import React, { useState } from 'react';
import { teachers } from './teachersData';
import './TeachersList.css';

const ChevronLeft = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="#4a148c">
    <path d="M15.41 16.59L10.83 12l4.58-4.59L14 6l-6 6 6 6 1.41-1.41z"/>
  </svg>
);

const ChevronRight = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="#4a148c">
    <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z"/>
  </svg>
);

const TeachersList = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedTeacher, setSelectedTeacher] = useState(null);
  
  // Mostrar 2 profesores a la vez
  const visibleTeachers = teachers.slice(currentIndex, currentIndex + 2);
  const canGoNext = currentIndex + 2 < teachers.length;
  const canGoPrev = currentIndex > 0;

  const next = () => {
    if (canGoNext) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const prev = () => {
    if (canGoPrev) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  return (
    <div className="teachers-container">
      <h3>Seleccionar Profesor</h3>
      <div className="teachers-slider">
        <button 
          className="nav-button prev" 
          onClick={prev}
          disabled={!canGoPrev}
          aria-label="Anterior"
        >
          <ChevronLeft />
        </button>
        
        <div className="teachers-grid">
          {visibleTeachers.map((teacher) => (
            <div 
              key={teacher.id}
              className={`teacher-card ${selectedTeacher === teacher.id ? 'selected' : ''}`}
              onClick={() => setSelectedTeacher(teacher.id)}
            >
              <div className="teacher-photo">
                {teacher.photo ? (
                  <img src={teacher.photo} alt={teacher.name} />
                ) : (
                  <div className="default-photo">
                    <span>Foto</span>
                  </div>
                )}
              </div>
              <div className="teacher-info">
                <h4>{teacher.name}</h4>
                <p>{teacher.specialty}</p>
              </div>
            </div>
          ))}
        </div>
        
        <button 
          className="nav-button next" 
          onClick={next}
          disabled={!canGoNext}
          aria-label="Siguiente"
        >
          <ChevronRight />
        </button>
      </div>
    </div>
  );
};

export default TeachersList;