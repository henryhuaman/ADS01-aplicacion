import React from 'react';
import './BlockModal.css';
import type { BlockData } from './BlocksData';

interface BlockModalProps {
  block: BlockData | null;
  onClose: () => void;
  onConfirm: () => void;
}

const BlockModal: React.FC<BlockModalProps> = ({ block, onClose, onConfirm }) => {
  if (!block) return null;

  const { details } = block;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="close-button" onClick={onClose}>×</button>

        <h2>Detalles del Bloque</h2>
        <div className="modal-section">
          <div className="detail-item"><strong>Curso:</strong> {details.curso}</div>
          <div className="detail-item"><strong>Profesor:</strong> {details.profesor}</div>
          <div className="detail-item"><strong>Correo:</strong> {details.correoProfesor}</div>
          <div className="detail-item"><strong>Fecha Inicio:</strong> {new Date(details.fechaInicio).toLocaleDateString('es-PE')}</div>
          <div className="detail-item"><strong>Fecha Fin:</strong> {new Date(details.fechaFin).toLocaleDateString('es-PE')}</div>
          <div className="detail-item"><strong>Horario:</strong> {details.horario}</div>
        </div>

        <div className="modal-actions">
          <button className="action-button confirm" onClick={onConfirm}>Confirmar</button>
          <button className="action-button cancel" onClick={onClose}>Cancelar</button>
        </div>
      </div>
    </div>
  );
};

export default BlockModal;
