'use client';
import getRestaurants from "@/app/actions/getRestaurants";
import RestModal from "../modals/RestModal";
import useRestaurantModal from "@/app/hooks/useRestModal";
import { useState } from "react";
import { Restaurant } from "@prisma/client";
import { FaBook, FaMapPin } from "react-icons/fa";
import { User } from "@prisma/client";



interface RestaurantFeedProps{
  currentUser:User;
  yourVariable: string;
}
const RestaurantFeed: React.FC<RestaurantFeedProps> = ({currentUser , yourVariable}) => {
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

  if(yourVariable=="All"){
    return (
      <>
        {restaurants.map((restaurant: Restaurant) => (
          
          <div key={restaurant.id}>
          <RestModal restaurant={restaurant} currentUser={currentUser}/>
          <div className="p-2 transition-ease-in-out
          delay-100
          hover:-translate-y-1 
          hover:scale-80
          duration-300">
           <div className="w-full h-48 seventh flex items-center justify-center rounded-xl relative gap-3" onClick={() => handleRestaurantClick(restaurant)}>
           <div className="w-1/3 pl-3" >
          <img src="./images/eggfactory.jpeg" alt="Your Image" className="w-auto max-h-full rounded-md" />
        </div>
        <div className="w-2/3 flex items-center justify-center">
        <div>
                    <h3 className="text-xl font-semibold" >{restaurant.name}</h3>
                    <br/>
                    <p className="flex flex-row gap-2"><FaMapPin size={15}/>{restaurant.locality}</p>
                    <p>Cuisines: {restaurant.cuisines.join(', ')} </p>
                    <p> Rating: {(restaurant.rating)?.toFixed(1)} </p>
                  </div>
          <button className="bg-yellow-500 text-black rounded-sm w-15 h-5 absolute top-2 right-2"><FaBook/></button>
        </div>
          </div>
        </div>
      </div>
        ))}
  
        {/* Render the modal with the selected restaurant */}
        {selectedRestaurant && (
          <RestModal restaurant={selectedRestaurant} currentUser={currentUser} />
        )}
      </>
    );
  }
  else{
    const filteredRestaurants = restaurants.filter((restaurant: Restaurant) => {
      // Assuming restaurant.cuisines is an array of cuisines
      return restaurant.cuisines.includes(yourVariable);});
    return (
      <>
        {filteredRestaurants.map((restaurant: Restaurant) => (
          
          <div key={restaurant.id}>
          <RestModal restaurant={restaurant} currentUser={currentUser}/>
          <div className="p-2 transition-ease-in-out
          delay-100
          hover:-translate-y-1 
          hover:scale-80
          duration-300">
           <div className="w-full h-48 seventh flex items-center justify-center rounded-xl relative gap-3" onClick={() => handleRestaurantClick(restaurant)}>
           <div className="w-1/3 pl-3" >
          <img src="./images/eggfactory.jpeg" alt="Your Image" className="w-auto max-h-full rounded-md" />
        </div>
        <div className="w-2/3 flex  justify-start">
        <div>
                    <h3 className="text-xl font-semibold" >{restaurant.name}</h3>
                    <br/>
                    <p className="flex flex-row gap-2"><FaMapPin size={15}/>{restaurant.locality}</p>
                    <p>Cuisines: {restaurant.cuisines.join(', ')} </p>
                    <p> Rating: {(restaurant.rating)?.toFixed(1)} </p>
                  </div>
          <button className="bg-yellow-500 text-black rounded-sm w-15 h-5 absolute top-2 right-2"><FaBook/></button>
        </div>
          </div>
        </div>
      </div>
        ))}
  
        {/* Render the modal with the selected restaurant */}
        {selectedRestaurant && (
          <RestModal restaurant={selectedRestaurant} currentUser={currentUser} />
        )}
      </>
    );






  }
};

export default RestaurantFeed;