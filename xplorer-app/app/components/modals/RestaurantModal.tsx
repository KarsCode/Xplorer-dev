import { IoLocationSharp } from "react-icons/io5";
import { AiFillStar } from "react-icons/ai";
import { BsTelephoneFill } from "react-icons/bs"
import React from "react";
import RModal from "../RModal";

interface RestaurantModalProps {
  isOpen?: boolean;
  onClose: () => void;
  restaurant: {
    name: string;
    image: string;
    description: string;
    locality: string;
    rating: number;
    contact: number;
  };
}

const RestaurantModal: React.FC<RestaurantModalProps> = ({
  isOpen,
  onClose,
  restaurant,
}) => {
  const { name, image, description, locality, rating, contact} = restaurant;

  return (
    <RModal
      isOpen={isOpen}
      onClose={onClose}
      title={name}
      body={
        <div className="text-white flex flex-col gap-2">
          {image && <img src={image} alt={name} className="mb-3 rounded-lg" />}
          <p>
            <strong>Description:</strong> {description}
          </p>
          <div className="flex flex-row gap-2">
            <IoLocationSharp size={20}/>
            <strong>Locality :</strong> {locality}
          </div>
          <div className="flex flex-row gap-2">
            <AiFillStar size={19} color="#eab308"/>
            <strong>Rating:</strong> {rating}
          </div>
          <div className="flex flex-row gap-2">
            <BsTelephoneFill size={20} color=" #6495ED "/>
            <strong>Contact Details:</strong> {contact}
          </div>
        </div>
      }
      actionLabel="Reserve"
    />
  );
};

export default RestaurantModal;
