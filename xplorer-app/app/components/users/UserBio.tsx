'use client';
import getUser from "@/app/actions/getUser";
import { format } from "date-fns";
import React, { useEffect, useMemo, useState } from "react";
import Button from "../Button";
import { User } from "@prisma/client";
import { BiCalendar } from "react-icons/bi";
import useEditModal from "@/app/hooks/useEditModal";
import getXU from "@/app/actions/getXU";
import XUModal from "../modals/XUModal";
import useXUModal from "@/app/hooks/useXUModal";

interface UserBioProps{
    userId:string;
    currentUser?: User;
}




const UserBio:React.FC<UserBioProps> =  ({userId,currentUser}) => {
    const {data:fetchedUser} = getUser(userId);
    
    
    const editModal = useEditModal();
    const xuModal = useXUModal();
    const createdAt = useMemo(() => {
        if (!fetchedUser?.createdAt) {
          return null;
        }
    
        return format(new Date(fetchedUser.createdAt), 'MMMM yyyy');
      }, [fetchedUser?.createdAt])
    return ( 
        
        <div className="border-b-[1px] border-neutral-800 pb-4">
            <div className="flex justify-end p-2">
            <div className="text-white p-2">
                {currentUser&&<div className="flex flex-col items-end gap-2">
                {currentUser?.id === fetchedUser.id ? (
                <Button secondary label="Edit" onClick={editModal.onOpen} />//editModal.onOpen
                ) : (
                    <><Button secondary label="XperienceUnite" onClick={xuModal.onOpen} />
                    <XUModal currentUser={currentUser} friendUser={fetchedUser}/>

                    </>
                    
                )} 
                {currentUser?.id === userId ? (<div className="bg-neutral-800 text-white">{fetchedUser?.friendcode} </div>
                ) : (<div></div> )}
                </div>}
                </div>
                </div>
                <div className="mt-8 px-4 ">
                    <div className="flex flex-col">
                        <p className="tenth text-2xl font-semibold">
                            {fetchedUser.name}
                        </p>
                        <p className="text-md text-neutral-500">
                            @{fetchedUser.username}
                        </p>
                        <div className="flex flex-col mt-4">
                            <p className="tenth">
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