'use client';
import getRestaurants from "@/app/actions/getRestaurants";
import RestModal from "../modals/RestaurantModal";
import useRestaurantModal from "@/app/hooks/useRestaurantModal";
import { useState } from "react";

const RestaurantFeed = () => {
  const {data:restaurants=[] }= getRestaurants();
  const restaurantModal = useRestaurantModal();
  const restaurantData = {
      name: "Egg Factory",
      description: "Italian Restaurant which is a good hangout place for friends and family",
      locality: "Manipal",
      rating: 4.5,
      contact: "8296354888",
    };
    console.log(restaurants);
    return ( <>
         {restaurants.map((restaurant:Record<string,any>)=>(
            <div key={restaurant.id}className="flex flex-col rounded-xl w-full h-60  border-2 border-white-5 gap-2 border-solid
            border-white p-10 m-2 ">
                <RestModal restaurant={restaurant} />
                <div className="flex flex-col">
                  <p className="text-white font-semibold text-sm" onClick={restaurantModal.onOpen}>
                    {restaurant.name}
                  </p>
                  <p className="text-neutral-400 text-sm">
                    @{restaurant.locality}
                    
                  </p>
                </div>
            </div>
          ))}
          
    
    
    
    </> );
}
 
export default RestaurantFeed;