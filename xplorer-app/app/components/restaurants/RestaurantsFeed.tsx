'use client';
import getRestaurants from "@/app/actions/getRestaurants";
import RestModal from "../modals/RestaurantModal";
import useRestaurantModal from "@/app/hooks/useRestaurantModal";
import { useState } from "react";

const RestaurantFeed = () => {
    const {data:restaurants=[] }= getRestaurants();
    const restaurantData = {
      name: "Egg Factory",
      description: "Italian Restaurant which is a good hangout place for friends and family",
      locality: "Manipal",
      rating: 4.5,
      contact: "8296354888",
    };
  const restaurantModal = useRestaurantModal();
  const [activeRestaurant, setActiveRestaurant] = useState<Record<string, any> | null>(null);
  const openRestaurantModal = (restaurant: Record<string, any>) => {
    setActiveRestaurant(restaurant);
    restaurantModal.onOpen();
  };
    return ( <>
         {restaurants.map((restauranti:Record<string,any>)=>(
            <div key={restauranti.id}className="flex flex-row gap-4">
                <RestModal restaurant={restaurantData} />
                <div className="flex flex-col">
                  <p className="text-white font-semibold text-sm" onClick={restaurantModal.onOpen}>
                    {restauranti.name}
                  </p>
                  <p className="text-neutral-400 text-sm">
                    @{restauranti.locality}
                    
                  </p>
                </div>
            </div>
          ))}
          
    
    
    
    </> );
}
 
export default RestaurantFeed;