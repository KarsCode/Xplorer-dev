'use client';
import getRestaurants from "@/app/actions/getRestaurants";
import useRestaurantModal from "@/app/hooks/useRestModal";
import { useState } from "react";
import { Post } from "@prisma/client";
import { FaBook, FaMapPin } from "react-icons/fa";
import { User } from "@prisma/client";
import EventModal from "@/app/components/modals/EventModal";
import getPosts from "../actions/getPosts";
import useEventModal from "../hooks/useEventModal";
import { MdOutlineTableRestaurant,MdWarning} from "react-icons/md";
import {AiFillHeart} from "react-icons/ai";
import toast from "react-hot-toast";
import addLike from "../actions/addLike";
import sendEmail from "../actions/sendEmail";
import axios from "axios";



interface RestaurantFeedProps {
  currentUser: User;
  yourVariable: string;
}

const RestaurantFeed: React.FC<RestaurantFeedProps> = ({ currentUser,yourVariable }) => {
  const { data: posts = [] } = getPosts();
  const eventModal = useEventModal();
  const [selectedPosts, setSelectedPosts] = useState<Post | null>(null);

  // Filter posts with the "Sports" tag
  const tag:string = yourVariable; //change here  
  const sportsPosts = (tag === 'All') ? posts : posts.filter((post: Post) => post.tag === tag);

  const handleRestaurantClick = (post: Post) => {
    setSelectedPosts(post);
    eventModal.onOpen();
  };

  const handleReportClick = (a:string) => {
    const toastContent = (
      <div className="flex flex-row gap-3 items-center">
        <p className="font font-extrabold"><b>Send Report?</b></p>
        <button
          onClick={() => {
            
                sendEmail("RAM_page123@outlook.com", "Report Raised", `Post flagged : ${a}`);
                toast.success("Email Sent!");
              
          }}
          className="bg-yellow-500 text-black rounded px-3 py-1"
        >
          Yes
        </button>
      </div>
    );
  
    toast(() => toastContent);
  };



  return (
    <>
      {sportsPosts.map((post: Post) => (
        <div key={post.id}>
          {/* <EventModal post={post} currentUser={currentUser} /> */}
        <div className="p-3
        transition-ease-in-out
        delay-100
        hover:-translate-y-1 
        hover:scale-80
        duration-300">
         <div className="fourth w-full h-48 bg-neutral-900 text-white flex items-center justify-center rounded-xl relative gap-3" onClick={() => handleRestaurantClick(post)}>
         <div className="w-1/3 pl-3 h-full flex justify-center align-center rounded-md" >
         <img src={post.eventImage||"./images/eggfactory.jpeg"} alt="Your Image" className="w-auto max-h-full rounded-md" />
      </div>
      <div className="w-2/3 flex items-center justify-center">
      <div>
                  <h3 className="text-xl font-semibold" >{post.title}</h3>
                  <br/>
                  <p className="flex flex-row gap-2"><FaMapPin size={15}/>{(post.latitude).toFixed(3)} {(post.longitude).toFixed(3)}</p>
                  <p>Date and Time: {post.date}</p>
                  <p> Tag: {post.tag}</p>
                </div>
                <div className="flex flex-row">
                <button className=" text-black rounded-sm w-15 h-5 absolute bottom-2 right-11 " onClick={(e)=>{e.stopPropagation(),addLike(currentUser.id,post.id)}}><AiFillHeart color="red"/></button>
                 <p className="absolute bottom-1.5 right-8">{ (post.likedIds).length} </p>
          </div>
          <button className="color-red-500 text-black rounded-full w-15 h-5 absolute bottom-2 right-2"
          onClick={(e) => {e.stopPropagation(),handleReportClick(post.id), console.log("Reporting")}}
          ><MdWarning color="yellow"/></button>
      </div>
                
          
      </div>
        </div>
      </div>
    
      ))}

      {selectedPosts && (
        <EventModal post={selectedPosts} currentUser={currentUser} />
      )}
    </>
  );
};

export default RestaurantFeed;


