// BlockModal.jsx
import React from 'react';
import './BlockModal.css';

const BlockModal = ({ block, onClose }) => {
  if (!block) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="close-button" onClick={onClose}>×</button>
        
        <h2>Detalles del Bloque</h2>
        <div className="modal-section">
          <h3>{block.id} - {block.name}</h3>
          <div className="detail-item">
            <span>Curso:</span>
            <span>{block.details.curso}</span>
          </div>
          <div className="detail-item">
            <span>Profesor:</span>
            <span>{block.details.profesor}</span>
          </div>
          <div className="detail-item">
            <span>Horario:</span>
            <span>{block.details.horario}</span>
          </div>
          <div className="detail-item">
            <span>Estudiantes:</span>
            <span>{block.details.estudiantes}</span>
          </div>
          <div className="detail-item">
            <span>Estado:</span>
            <span>{block.details.estado}</span>
          </div>
        </div>

        <div className="modal-actions">
          <button className="action-button confirm">Confirmar</button>
          <button className="action-button cancel" onClick={onClose}>Cancelar</button>
        </div>
      </div>
    </div>
  );
};

export default BlockModal;