// components/ButtonList.tsx
import React from 'react';
import Button from './Button';
import './ButtonList.css';

const ButtonList: React.FC = () => {
  return (
    <div className="button-list">
      <Button title="Home" icon="./whale.png" />
      <Button title="Xplore" icon="./whale.png" />
      <Button title="Alerts" icon="./whale.png" />
      <Button title="Recommendations" icon="./whale.png" />
      <Button title="Saved" icon="./whale.png" />
      <Button title="Profile" icon="./whale.png" />
      <Button title="Settings" icon="./whale.png" />
    </div>
  );
};

export default ButtonList;
