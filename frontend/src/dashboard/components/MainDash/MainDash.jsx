// MainDash.jsx
import React, { useState } from 'react';
import { blocksData } from '../Blocks/BlocksData';
import Block from '../Blocks/Block';
import BlockModal from '../Blocks/BlockModal';
import TeachersList from "../TeacherList/TeachersList";
import './MainDash.css';

const MainDash = () => {
  const [selectedBlock, setSelectedBlock] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const handleBlockClick = (block) => {
    setSelectedBlock(block);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedBlock(null);
  };

  const handleConfirm = () => {
    // Lógica para confirmar la selección
    alert("Selección confirmada exitosamente!");
  };

  return (
    <div className="MainDash">
      <h1>Dashboard</h1>
      
      <div className="top-section">
        <TeachersList />
      </div>
      
      <section className="section-container">
        <h2>Seleccionar Bloque</h2>
        <div className="blocks-container">
          {blocksData.map((block) => (
            <Block 
              key={block.id} 
              block={block} 
              onClick={handleBlockClick} 
            />
          ))}
        </div>
      </section>

      {/* Botón de confirmación en la parte inferior */}
      <div className="confirm-button-container">
        <button className="confirm-button" onClick={handleConfirm}>
          CONFIRMAR
        </button>
      </div>

      {showModal && (
        <BlockModal 
          block={selectedBlock} 
          onClose={closeModal} 
        />
      )}
    </div>
  );
};

export default MainDash;