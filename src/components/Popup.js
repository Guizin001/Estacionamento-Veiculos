import React from 'react';
import '../styles/popup.css';

const Popup = ({ children, onClose }) => {
  return (
    <div className="popup-overlay">
      <div className="popup-content">
        <button id="close-popup" onClick={onClose}>&times;</button>
        {children}
      </div>
    </div>
  );
};

export default Popup;