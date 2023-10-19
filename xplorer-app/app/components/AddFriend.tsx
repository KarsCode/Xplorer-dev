
"use client"
import React from 'react';
import NumberInput from './FriendCode';
import { User } from '@prisma/client';
import addFriend from '../actions/addFriend';

interface AddFriendProps{
  currentUser:User
}


const AddFriend:React.FC<AddFriendProps> = ({currentUser}) =>{
  const handleNumberSubmit = (string: string) => {
    if(currentUser.friendcode==string){
      return;
    }
    addFriend(currentUser.id,string);
  };

  return (
    <div>
      {/* Other content */}
      <NumberInput onSubmit={handleNumberSubmit} />
      {/* Other content */}
    </div>
  );
}

export default AddFriend