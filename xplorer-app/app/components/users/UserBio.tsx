'use client';
import getCurrentUser from "@/app/actions/getCurrentUser";
import getUser from "@/app/actions/getUser";
import { format } from "date-fns";
import React, { useMemo } from "react";
import Button from "../Button";
import { User } from "@prisma/client";
import { BiCalendar } from "react-icons/bi";
import useEditModal from "@/app/hooks/useEditModal";
import useLoginModal from "@/app/hooks/useLoginModal";

interface UserBioProps{
    userId:string;
    currentUser?: User;
}




const UserBio:React.FC<UserBioProps> =  ({userId,currentUser}) => {
    const {data:fetchedUser} = getUser(userId);
    const editModal = useEditModal();
    const createdAt = useMemo(() => {
        if (!fetchedUser?.createdAt) {
          return null;
        }
    
        return format(new Date(fetchedUser.createdAt), 'MMMM yyyy');
      }, [fetchedUser?.createdAt])
    return ( 
        <div className="border-b-[1px] border-neutral-800 pb-4">
            <div className="flex justify-end p-2">
            {currentUser?.id === userId ? (
                <Button secondary label="Edit" onClick={editModal.onOpen} />//editModal.onOpen
                ) : (
                    <Button secondary label="XperienceUnite" onClick={()=>{}} />
                )} 
                </div>
                <div className="mt-8 px-4 ">
                    <div className="flex flex-col">
                        <p className="text-white text-2xl font-semibold">
                            {fetchedUser.name}
                        </p>
                        <p className="text-md text-neutral-500">
                            @{fetchedUser.username}
                        </p>
                        <div className="flex flex-col mt-4">
                            <p className="text-white">
                                {fetchedUser?.bio}
                            </p>
                            <div className="flex flex-row items-center gap-4 mt-4 text-neutral-500">
                                <BiCalendar size={24}/>
                                    Xploring since {createdAt}
                            </div>
                        </div>
                    </div>
                </div>
        </div>
     );
}
 
export default UserBio;