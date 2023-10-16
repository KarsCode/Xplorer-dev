
import React, { useState } from 'react';
import OpenedComponent from './OpenedComponent';

function Button() {
  const [isModalVisible, setModalVisible] = useState(false);

  const toggleModalVisibility = () => {
    setModalVisible(!isModalVisible);
  };

  return (
    <div>
      <button className="MapButton" onClick={toggleModalVisibility}></button>
      {isModalVisible && <OpenedComponent closeModal={toggleModalVisibility} />}
    </div>
  );
}

export default Button;

