'use client';
import { useState } from "react";
import getCurrentUser from "../actions/getCurrentUser";
import Header from "./Header";
import HomeFeed from "./HomeFeed";
import { User } from '@prisma/client';

interface PostPageProps{
    currentUser?:User
  }



const PostPage:React.FC<PostPageProps> =  ({currentUser}) => {
    
    const [yourVariable, setYourVariable] = useState('All');


    return ( 
    
    <div> 
      <Header label='Home' yourVariable={yourVariable} setYourVariable={setYourVariable} />
      <div className='h-screen overflow-x-auto'>
      {currentUser&&<HomeFeed currentUser={currentUser} yourVariable={yourVariable} />}   
      </div>
    </div>
    
    
    );
}
 
export default PostPage;