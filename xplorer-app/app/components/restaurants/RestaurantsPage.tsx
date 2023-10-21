import { User } from "@prisma/client";
'use client'
import Header from "../Header";
import RestaurantFeed from "./RestaurantsFeed";
import MyCuisineBox from "../MyCuisineBox";
import { useState } from "react";

interface RestaurantsPageProps{
    currentUser: User
}



const RestaurantsPage:React.FC<RestaurantsPageProps> = ({currentUser}) => {
    const [yourVariable, setYourVariable] = useState('All');
    return ( 
        <>
            <Header showBackArrow label={"Restaurants"} yourVariable={yourVariable} setYourVariable={setYourVariable}/>
            
            <div className="h-screen overflow-x-auto">
            <RestaurantFeed currentUser={currentUser} yourVariable={yourVariable} />
            </div>
        </>
        
        
    );
}
 
export default RestaurantsPage;