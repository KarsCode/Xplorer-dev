'use client';
import getRestaurants from "@/app/actions/getRestaurants";

const RestaurantFeed = () => {
    const {data:restaurants=[] }= getRestaurants();
    return ( <>
         {restaurants.map((restaurant:Record<string,any>)=>(
            <div key={restaurant.id}className="flex flex-row gap-4">
                <div className="flex flex-col">
                  <p className="text-white font-semibold text-sm">
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