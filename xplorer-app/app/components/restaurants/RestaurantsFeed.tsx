'use client';
import getRestaurants from "@/app/actions/getRestaurants";
import RestModal from "../modals/RestModal";
import useRestaurantModal from "@/app/hooks/useRestaurantModal";
import { useState } from "react";
import { Restaurant } from "@prisma/client";

const RestaurantFeed: React.FC = () => {
  const { data: restaurants = [] } = getRestaurants();
  const restaurantModal = useRestaurantModal();
  // State to keep track of the currently selected restaurant
  const [selectedRestaurant, setSelectedRestaurant] = useState<Restaurant | null>(
    null
  );

  const handleRestaurantClick = (restaurant: Restaurant) => {
    setSelectedRestaurant(restaurant);
    restaurantModal.onOpen();
  };

  return (
    <>
      {restaurants.map((restaurant: Restaurant) => (
        <div
          key={restaurant.id}
          className="flex flex-col rounded-xl w-full h-60 border-2 border-white-5 gap-2 border-solid border-white p-10 m-2"
        >
          <RestModal restaurant={restaurant} />
          <div className="flex flex-col">
            <p
              className="text-white font-semibold text-sm"
              onClick={() => handleRestaurantClick(restaurant)}
            >
              {restaurant.name}
            </p>
            <p className="text-neutral-400 text-sm">@{restaurant.locality}</p>
          </div>
        </div>
      ))}

      {/* Render the modal with the selected restaurant */}
      {selectedRestaurant && (
        <RestModal restaurant={selectedRestaurant} />
      )}
    </>
  );
};

export default RestaurantFeed;