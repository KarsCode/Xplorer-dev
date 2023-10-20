'use client';
import getRestaurants from "@/app/actions/getRestaurants";
import RestModal from "../modals/RestaurantModal";
import useRestaurantModal from "@/app/hooks/useRestaurantModal";
import { useState } from "react";
import { FaBook, FaStar, FaMapPin } from "react-icons/fa";

const RestaurantFeed = () => {
  const {data:restaurants=[] }= getRestaurants();
  const restaurantModal = useRestaurantModal();
  const rest1 = {
    "name": "My Restaurant",
    latitude:13.344024,
    longitude: 74.792209,
    locality: "Bangalore",
    cuisines: ["Italian", "Chinese", "Indian"],
    rating:4.5
  };
    console.log(restaurants);
    return (<>
    <div className="p-2">
     <div className="w-full h-48 bg-neutral-900 text-white flex items-center justify-center rounded-xl relative gap-3">
     <div className="w-1/3 pl-3">
    <img src="./images/eggfactory.jpeg" alt="Your Image" className="w-auto max-h-full rounded-md" />
  </div>
  <div className="w-2/3 flex items-center justify-center">
  <div>
              <h3 className="text-xl font-semibold">{rest1.name}</h3>
              <br/>
              <p className="flex flex-row gap-2"><FaMapPin size={15}/>{rest1.locality}</p>
              <p>Cuisines: {rest1.cuisines.join(', ')}</p>
              <p> Rating: {rest1.rating}</p>
            </div>
    <button className="bg-yellow-500 text-black rounded-sm w-15 h-5 absolute top-2 right-2"><FaBook/></button>
  </div>
    </div>
    </div>
    </>);
}
 
export default RestaurantFeed;