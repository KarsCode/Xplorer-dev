"use client"
import React, { useState } from "react";
import RestaurantModal from "./modals/RestaurantModal";

function RestaurantComponent() {
  const [isRestaurantModalOpen, setRestaurantModalOpen] = useState(false);

  // Restaurant details
  const restaurantData = {
    name: "Egg Factory",
    image: "/images/eggfactory.jpeg",
    description: "Italian Restaurant which is a good hangout place for friends and family",
    locality: "Manipal",
    rating: 4.5,
    contact: 8296354888,
  };

  const openRestaurantModal = () => {
    setRestaurantModalOpen(true);
  };


  const closeRestaurantModal = () => {
    setRestaurantModalOpen(false);
  };

  return (
    <div>
      <button onClick={openRestaurantModal}>View Restaurant Details</button>

      <RestaurantModal
        isOpen={isRestaurantModalOpen}
        onClose={closeRestaurantModal}
        restaurant={restaurantData}
      />
    </div>
  );
}

export default RestaurantComponent;
