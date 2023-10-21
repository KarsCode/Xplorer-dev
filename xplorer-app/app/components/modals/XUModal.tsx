import React, { useState } from "react";
import Modal from "../Modal"; 
import useXUModal from "@/app/hooks/useXUModal";
import { Restaurant, User } from "@prisma/client";

interface XUModalProps {
  percentage: number; // Integer percentage
  restaurants?: Restaurant[]; // Array of restaurants (made optional)
}

const XUModal: React.FC<XUModalProps> = ({ percentage, restaurants }) => {
  const [isLoading, setIsLoading] = useState(false);
  const XUModal = useXUModal();

  const onSubmit = () => {
    // Reservation here
  };

  const bodyContent = (
    <div className="text-white flex flex-col gap-2">
      <div className="text-xl text-center">
        {percentage}%
      </div>
      <div className="flex flex-row gap-2">
        <strong className="text-white">Restaurants:</strong>
      </div>
      <div>
        {restaurants?.map((restaurant, index) => (
          <div key={index} className="flex flex-col gap-2">
            <strong>Name: {restaurant.name}</strong>
            <p>Description: {restaurant.cusines}</p>
            <p>Locality: {restaurant.locality}</p>
            <p>Rating: {restaurant.rating?.toFixed(1)}</p>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <Modal
      disabled={isLoading}
      isOpen={XUModal.isOpen}
      title="XperienceUnite"
      actionLabel="Clear"
      onClose={XUModal.onClose}
      onSubmit={onSubmit}
      body={bodyContent}
    />
  );
};

export default XUModal;
