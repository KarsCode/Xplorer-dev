'use client';

import { IoLocationSharp } from "react-icons/io5";
import { AiFillStar } from "react-icons/ai";
import { BsTelephoneFill } from "react-icons/bs"
import React, { useState } from "react";
import Modal from "../Modal";
import useEventModal from "@/app/hooks/useEventModal";
import  {Post , User} from "@prisma/client";
import axios from "axios";
import toast from "react-hot-toast";


interface EventModalProps{
    currentUser: User;
    post: Post;
}

const EventModal: React.FC<EventModalProps> = ({ post,currentUser }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [userRating, setUserRating] = useState(0); // State to manage the user's rating
    const eventModal = useEventModal();
  
    const onSubmit = () => {
      // Reservation here
    };
  
    const { title, eventImage, description, latitude, longitude, date , tag } = post;
    console.log(eventImage);
  
    const bodyContent = (
      <div className="text-white flex flex-col gap-2">
        {!eventImage && <img src="/images/eggfactory.jpeg" alt={title} className="mb-3 rounded-lg" />}
        <p>
          <strong>Description:</strong> {description}
        </p>
        <div className="flex flex-row gap-2">
          <IoLocationSharp size={20} />
          <strong>Latitude and Longitude :</strong> {latitude.toFixed(4)} {longitude.toFixed(4)}
        </div>
        <div className="flex flex-row gap-2">
          <AiFillStar size={19} color="#eab308" />
          <strong>Date and Time:</strong> {date}
        </div>
        <div className="flex flex-row gap-2">
          <BsTelephoneFill size={20} color="#6495ED" />
          <strong>Tag:</strong> {tag}
        </div>
      </div>
    );
  
    return (
      <Modal
        disabled={isLoading}
        isOpen={eventModal.isOpen}
        title={title}
        actionLabel="Remind Me"
        onClose={eventModal.onClose}
        onSubmit={onSubmit}
        body={bodyContent}
      />
    );
  };
 
export default EventModal;   