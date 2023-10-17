// components/OpenedComponent.js
"use client"
import React from 'react';
import MapComponent from './MapComponent';
import { User } from "@prisma/client";

interface OpenedComponentProps {
	closeModal: () => void;
    currentUser: User ;
  }

function OpenedComponent({ currentUser ,closeModal }: OpenedComponentProps) {
  return (
    <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-opacity-60 bg-black z-10">
      <div className="bg-transparent p-10 border-0 text-center relative w-screen h-screen max-w-7xl box-border flex flex-col justify-center items-center">
        <h2> <MapComponent currentUser={currentUser}/></h2>
        <button onClick={closeModal} className='text-white bg-black-500 hover:bg-gray-600 py-2 px-4 rounded'>Close</button>
      </div>
    </div>
  );
}

export default OpenedComponent;
