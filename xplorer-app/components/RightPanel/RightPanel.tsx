
import React, { useState } from 'react';
import Button from './Button';
import Popup from './popup';
import ButtonList from './ButtonList';

const RightPanel: React.FC = () => {
    const [isPopupOpen, setPopupOpen] = useState(false);

    const openPopup = () => {
      setPopupOpen(true);
    };
  
    const closePopup = () => {
      setPopupOpen(false);
    };
  return (
    <div>
    <ButtonList />
    <button className='login-button' onClick={openPopup}>Login/Sign Up</button>
    <Popup open={isPopupOpen} onclose={closePopup} />

    </div>
    );
};

export default RightPanel;
