'use client';

import { IoLocationSharp } from "react-icons/io5";
import { AiFillStar } from "react-icons/ai";
import { BsTelephoneFill } from "react-icons/bs"
import React, { useState } from "react";
import Modal from "../Modal";
import useRestaurantModal from "@/app/hooks/useRestModal";
import  {Restaurant , User} from "@prisma/client";
import axios from "axios";
import toast from "react-hot-toast";
import RModal from "../RModal";
import addRatedCount from "@/app/actions/addRatedCount";
import sendEmail from "@/app/actions/sendEmail";



interface RestaurantModalProps{
    currentUser: User;
    restaurant: Restaurant;
}

const RestModal: React.FC<RestaurantModalProps> = ({ restaurant,currentUser }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [userRating, setUserRating] = useState(0); // State to manage the user's rating
    const restaurantModal = useRestaurantModal();
    const restModal = useRestaurantModal();
  
    const onSubmit = () => {
      const currentDate = new Date();
      const formattedDate = currentDate.toISOString().slice(0, 10);
      sendEmail("RAM_page123@outlook.com", "Reservation Made", `Reservation Made On: ${formattedDate}`);
      toast.success("Email Sent!");
    };
  
    const { name, image, description, locality, rating, contact } = restaurant;
  
    const onRatingChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const rating = parseInt(event.target.value, 10);
        setUserRating(rating);
        setIsLoading(true);

         const userId=currentUser.id;
         const resId=restaurant.id;
         axios.post('/api/rating',{rating,userId,resId})
            .then(()=>{
                const id = currentUser.id;
                restModal.onClose();
                currentUser.ratedCount=currentUser.ratedCount+1;
                addRatedCount(id);
             })
             .catch((error)=>{
                 toast.error("Something Went Wrong");
             })
             .finally(()=>{
                setIsLoading(false);
             })

      };
  
    const bodyContent = (
      <div className="text-white flex flex-col gap-2">
        {!image && <img src="/images/eggfactory.jpeg" alt={name} className="mb-3 rounded-lg" />}
        <p>
          <strong>Description:</strong> {description}
        </p>
        <div className="flex flex-row gap-2">
          <IoLocationSharp size={20} />
          <strong>Locality :</strong> {locality}
        </div>
        <div className="flex flex-row gap-2">
          <AiFillStar size={19} color="#eab308" />
          <strong>Rating:</strong> {rating?.toFixed(1)}
        </div>
        <div className="flex flex-row gap-2">
          <BsTelephoneFill size={20} color="#6495ED" />
          <strong>Contact Details:</strong> {contact}
        </div>
        <div className="flex flex-row gap-2">
        <strong className="text-white">Your Rating:</strong>
  <select
    value={userRating}
    onChange={onRatingChange}
    className="text-black border border-gray-300 rounded p-1"
  >
    <option value={0}>Select a rating</option>
    <option value={1}>1 Star</option>
    <option value={2}>2 Stars</option>
    <option value={3}>3 Stars</option>
    <option value={4}>4 Stars</option>
    <option value={5}>5 Stars</option>
  </select>
        </div>
      </div>
    );
  
    return (
      <RModal
        disabled={isLoading}
        isOpen={restaurantModal.isOpen}
        title={name}
        actionLabel="Reserve"
        onClose={restaurantModal.onClose}
        onSubmit={onSubmit}
        body={bodyContent}
      />
    );
  };
 
export default RestModal;   