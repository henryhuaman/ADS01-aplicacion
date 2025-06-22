import React from 'react';
import './Block.css'; 
import type { BlockData } from './BlocksData';

interface BlockProps {
  block: BlockData;
  onClick: (block: BlockData) => void;
  isSelected: boolean;
}

const Block: React.FC<BlockProps> = ({ block, onClick, isSelected }) => {
  return (
    <div className={`block-item ${isSelected ? 'selected' : ''}`} onClick={() => onClick(block)}>
      <div className="block-id">{block.idDisplay}</div>
      <div className="block-name">{block.name}</div>
    </div>
  );
};

export default Block;
