import React, { useState } from 'react';
import './popup.css';

interface PopupProps {
  open: boolean;
  onclose: () => void;
}

const Popup: React.FC<PopupProps> = ({ open, onclose }) => {
  if (!open) return null;

  return (
    <div className="popup-container">
      <div className="popup-content">
        <button className="close-button" onClick={onclose}>x</button>
        <p>HI</p>
      </div>
    </div>
  );
};

export default Popup;
