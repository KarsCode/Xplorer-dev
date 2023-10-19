'use client';
import React from 'react';
import Header from '../../components/Header';
import { useParams   } from 'next/navigation';
import getUser from '@/app/actions/getUser';
import {ClipLoader} from "react-spinners";
import UserHero from '@/app/components/users/UserHero';
import UserBio from '@/app/components/users/UserBio';
import { User } from '@prisma/client';
import EditModal from '../modals/EditModal';
interface UserPageProps{
    currentUser? :User;
}

const UserPage:React.FC<UserPageProps> =  ({currentUser}) => {

  const params = useParams();
 const userId = Array.isArray(params!.userId) ? params!.userId[0] : params!.userId;
 
  const {data:fetchedUser ,isLoading} = getUser(userId);
  if(isLoading||!fetchedUser){
      return(
        <div className='
        flex
        justify-center
        items-center
        h-full'>
          {/* <ClipLoader color="yellow" size={60}/> */}
          <span className="loader"></span>
        </div>
      )
  }
  return (
    <div>
      <Header showBackArrow label={fetchedUser.name} />
      <UserHero userId={userId as string}/>
      <UserBio userId={userId as string} currentUser={currentUser} />
      {currentUser&&<EditModal currentUser={currentUser}/>}
      

    </div>
  );
};

export default UserPage;