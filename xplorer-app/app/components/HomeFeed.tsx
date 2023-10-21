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
import { MdOutlineTableRestaurant } from "react-icons/md";



interface RestaurantFeedProps {
  currentUser: User;
}

const RestaurantFeed: React.FC<RestaurantFeedProps> = ({ currentUser }) => {
  const { data: posts = [] } = getPosts();
  const eventModal = useEventModal();
  const [selectedPosts, setSelectedPosts] = useState<Post | null>(null);

  // Filter posts with the "Sports" tag
  const sportsPosts = posts.filter((post: Post) => post.tag === "Movies");

  const handleRestaurantClick = (post: Post) => {
    setSelectedPosts(post);
    eventModal.onOpen();
  };

  return (
    <>
      {sportsPosts.map((post: Post) => (
        <div key={post.id}>
        <div className="p-3
        transition-ease-in-out
        delay-100
        hover:-translate-y-1 
        hover:scale-80
        duration-300">
         <div className="fourth w-full h-48 bg-neutral-900 text-white flex items-center justify-center rounded-xl relative gap-3" onClick={() => handleRestaurantClick(post)}>
         <div className="w-1/3 pl-3" >
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
        <button className="bg-yellow-500 text-black rounded-sm w-15 h-5 absolute top-2 right-2"><MdOutlineTableRestaurant/></button>
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