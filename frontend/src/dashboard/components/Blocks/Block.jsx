// Block.jsx
import React, { useState } from 'react';
import './Block.css';

const Block = ({ block, onClick }) => {
  return (
    <div className="block-item" onClick={() => onClick(block)}>
      <div className="block-id">{block.id}</div>
      <div className="block-name">{block.name}</div>
    </div>
  );
};

export default Block;