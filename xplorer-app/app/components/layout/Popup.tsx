import React, { useState } from 'react';

import { User } from "@prisma/client";
import Fbar from './FBar'

interface PopupProps {
  open: boolean;
  onclose: () => void;
  currentUser: User | null | undefined,
}

const Popup: React.FC<PopupProps> = ({ open, onclose,currentUser }) => {
  if (!open) return null;

  return (
    <div className="popup-container">
      <div className="popup-content">
        <button className="close-button" onClick={onclose}>x</button>
        <p className='flex h-fit' ><Fbar currentUser={currentUser}/></p>
      </div>
    </div>
  );
};

export default Popup;