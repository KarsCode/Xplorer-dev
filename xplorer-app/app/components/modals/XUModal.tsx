import React, { useEffect } from "react";
import Modal from "../Modal";
import useXUModal from "@/app/hooks/useXUModal";
import { Restaurant, User } from "@prisma/client";
import getXU from "@/app/actions/getXU";

interface XUModalProps {
  currentUser: User;
  friendUser: User;
}

const XUModal: React.FC<XUModalProps> = ({ currentUser, friendUser }) => {
  const { data, error, isLoading } = getXU(currentUser.id, friendUser.id);
  const XUModal = useXUModal();

  useEffect(() => {
    if (error) {
      console.error('Error:', error);
    }
  }, [error]);

  const onSubmit = () => {
    // Define the action to be taken when the modal is submitted.
  };
  
  const bodyContent = (
    <div className="text-white flex flex-col gap-2">
      <div className="text-xl text-center">
        {data ? `${data.percentage}%` : "Loading..."}
      </div>
      <div className="flex flex-row gap-2">
        <strong className="text-white">Restaurants:</strong>
      </div>
      <div>
        {data && data.restaurants?.map((restaurant, index) => (
          <div key={index} className="flex flex-col gap-2">
            <strong>Name: {restaurant.name}</strong>
            <p>Description: {restaurant.cuisines}</p>
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