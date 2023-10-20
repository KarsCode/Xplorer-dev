'use client';
import getRestaurants from "@/app/actions/getRestaurants";
import RestModal from "../modals/RestModal";
import useRestaurantModal from "@/app/hooks/useRestaurantModal";
import { useState } from "react";
import { Restaurant } from "@prisma/client";
import { FaBook, FaMapPin } from "react-icons/fa";

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
        
        <>
        <RestModal restaurant={restaurant} />
        <div className="p-2">
         <div className="w-full h-48 bg-neutral-900 text-white flex items-center justify-center rounded-xl relative gap-3" onClick={() => handleRestaurantClick(restaurant)}>
         <div className="w-1/3 pl-3" >
        <img src="./images/eggfactory.jpeg" alt="Your Image" className="w-auto max-h-full rounded-md" />
      </div>
      <div className="w-2/3 flex items-center justify-center">
      <div>
                  <h3 className="text-xl font-semibold" >{restaurant.name}</h3>
                  <br/>
                  <p className="flex flex-row gap-2"><FaMapPin size={15}/>{restaurant.locality}</p>
                  <p>Cuisines: {restaurant.cusines.join(', ')}</p>
                  <p> Rating: {restaurant.rating}</p>
                </div>
        <button className="bg-yellow-500 text-black rounded-sm w-15 h-5 absolute top-2 right-2"><FaBook/></button>
      </div>
        </div>
      </div>
    </>
      ))}

      {/* Render the modal with the selected restaurant */}
      {selectedRestaurant && (
        <RestModal restaurant={selectedRestaurant} />
      )}
    </>
  );
};

export default RestaurantFeed;