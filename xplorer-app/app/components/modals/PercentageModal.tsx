import React from 'react';
import PercentageComponent from '../Percentage';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  percentage: number; // Explicitly define the prop type
  sentences: string[];
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, percentage, sentences }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center">
      <div className="modal-overlay absolute w-full h-full bg-gray-900 opacity-50"></div>
      <div className="modal-container bg-white w-11/12 md:max-w-md mx-auto rounded shadow-lg z-50 overflow-y-auto">
        <div className="modal-content py-4 text-left px-6">
          <PercentageComponent percentage={percentage} sentences={sentences} />
          <div className="mt-4">
            <button
              onClick={onClose}
              className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
