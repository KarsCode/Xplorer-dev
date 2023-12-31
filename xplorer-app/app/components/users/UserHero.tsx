import React from "react";
import Image from 'next/image';
import getUser from "@/app/actions/getUser";
import Avatar from "../Avatar";

interface UserHeroProps{
    userId:string,
}



const UserHero:React.FC<UserHeroProps> = ({userId}) => {
    const {data:fetchedUser} = getUser(userId);
    return ( <div>
        <div className="bg-neutral-700 h-44 relative">
            {fetchedUser?.coverImage &&(
                <Image
                    src={fetchedUser.coverImage}
                    fill
                    alt="Cover Image"
                    style={{objectFit:'cover'}}
                />
            )}
            <div className="absolute -bottom-16 right-56">
                <Avatar userId={userId} isLarge hasBorder/>
            </div>
        </div>
    </div> );
}
 
export default UserHero;