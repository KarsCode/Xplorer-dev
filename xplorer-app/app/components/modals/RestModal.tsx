'use client';

import { IoLocationSharp } from "react-icons/io5";
import { AiFillStar } from "react-icons/ai";
import { BsTelephoneFill } from "react-icons/bs"
import React, { useState } from "react";
import RModal from "../Modal";
import useRestaurantModal from "@/app/hooks/useRestaurantModal";


interface RestaurantModalProps{
    restaurant: {
      name: string;
      image?: string | undefined | null;
      description?: string | undefined;
      locality: string;
      rating?: number | undefined|null;
      contact?: string | undefined;

      };
}
const RestModal:React.FC<RestaurantModalProps> = ({restaurant}) => {
    const[isLoading , setIsLoading] = useState(false);
    const restaurantModal = useRestaurantModal();
    const onSubmit =()=>{};
    const { name, image, description, locality , rating, contact} = restaurant;
    
    const bodyContent = (
    <div className="text-white flex flex-col gap-2">
        {!image && <img src="/images/eggfactory.jpeg" alt={name} className="mb-3 rounded-lg" />}
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
        </div>);





    return ( 
        <RModal  
        disabled={isLoading}
        isOpen={restaurantModal.isOpen}
        title={name}
        actionLabel='Reserve'
        onClose={restaurantModal.onClose}
        onSubmit={onSubmit} 
        body={bodyContent}
        />
    );
}
 
export default RestModal;   