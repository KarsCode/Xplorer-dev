import { User } from "@prisma/client";
import Header from "../Header";
import RestaurantFeed from "./RestaurantsFeed";

interface RestaurantsPageProps{
    currentUser: User
}



const RestaurantsPage:React.FC<RestaurantsPageProps> = ({currentUser}) => {
    return ( 
        <>
            <Header showBackArrow label={"Restaurants"} />
            <div className="h-screen overflow-x-auto">
            <RestaurantFeed currentUser={currentUser}/>
            </div>
        </>
        
        
    );
}
 
export default RestaurantsPage;