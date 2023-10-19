import { User } from "@prisma/client";
import Header from "../Header";
import RestaurantFeed from "./RestaurantsFeed";

interface RestaurantsPageProps{
    currentUser?: User
}



const RestaurantsPage:React.FC<RestaurantsPageProps> = ({currentUser}) => {
    return ( 
        <>
            <Header showBackArrow label={"Restaurants"} />
            <RestaurantFeed/>

        </>
        
        
    );
}
 
export default RestaurantsPage;