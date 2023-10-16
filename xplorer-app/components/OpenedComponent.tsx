// components/OpenedComponent.js
"use client"
import React from 'react';
import MapComponent from './Map';

interface OpenedComponentProps {
	closeModal: () => void;
  }

function OpenedComponent({ closeModal }: OpenedComponentProps) {
  return (
    <div className="overlay">
      <div className="modal">
        <h2> <MapComponent/></h2>
		{/* Add your component content here */}
        <button onClick={closeModal}>Close</button>
      </div>
    </div>
  );
}

export default OpenedComponent;
