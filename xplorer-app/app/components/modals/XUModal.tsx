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
  <div className="text-4xl text-center font-bold">
    {data ? `${data.percentage?.toFixed(2)}%` : "Loading..."}
  </div>
  <div className="flex flex-col gap-2">
    <strong className="text-white">Restaurants both of you might like:</strong>
  </div>
  <div>
    {data && data.restaurants?.map((restaurant, index) => (
      <div key={index} className="bg-gray-900 p-4 rounded-md shadow-md my-4">
        <strong className="text-yellow-400 text-xl font-semibold mb-2">
          {restaurant.name}
        </strong>
        <p className="text-gray-300 mb-1">Description: {restaurant.cuisines}</p>
        <p className="text-gray-300 mb-1">Locality: {restaurant.locality}</p>
        <p className="text-yellow-400">Rating: {restaurant.rating?.toFixed(1)}</p>
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
      actionLabel=""
      onClose={XUModal.onClose}
      onSubmit={onSubmit}
      body={bodyContent}
    />
  );
};

export default XUModal;