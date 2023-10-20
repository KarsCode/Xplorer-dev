import React, { useState } from 'react';
import OpenedComponent from './OpenedComponent';
import { User } from "@prisma/client";
interface OpenedComponentProps {
    currentUser: User ;
  }
function MapButton({ currentUser}: OpenedComponentProps){
  const [isModalVisible, setModalVisible] = useState(false);

  const toggleModalVisibility = () => {
    setModalVisible(!isModalVisible);
  };

  return (
    <div>
      <button
        onClick={toggleModalVisibility}
        className="transition-ease-in-out
        delay-100
        hover:-translate-y-1 
        hover:scale-110
        duration-300 inline-flex p-8 md:p-24 max-w-full lg:w-screen md:max-w-64 max-h-full md:max-h-64 text-white text-2xl border-0 rounded cursor-pointer text-center bg-cover bg-no-repeat bg-center overflow-hidden"
        style={{
          backgroundImage: 'url(/images/MapImageNew.jpeg.jpeg)', 
        }}
      />
      {isModalVisible && <OpenedComponent currentUser={currentUser} closeModal={toggleModalVisibility} />}
    </div>
  );
}

export default MapButton;