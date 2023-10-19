'use client';
import { BsPlusLg } from "react-icons/bs";
import { useRouter } from "next/navigation";

import useLoginModal from "@/app/hooks/useLoginModal";
import getCurrentUser from "@/app/actions/getCurrentUser";
import { useCallback } from "react";
import LoginModal from "../modals/LoginModal";
import { User } from "@prisma/client";
import usePostModal from "@/app/hooks/usePostModal";
interface SidebarPostButtonProps {
  currentUser: User ;
}
const SidebarPostButton =  ({currentUser}: SidebarPostButtonProps) => {
  const router = useRouter();
  const loginModal = useLoginModal();

  const onClick = useCallback(() => {
    
      return loginModal.onOpen();
  }, [loginModal, router, ]);

  const postModal = usePostModal();


  const onPost = useCallback(()=> {
   postModal.onOpen();
    
  },[postModal])

  return (
    <><div onClick={onPost}>
      <div className="
        mt-6
        lg:hidden 
        rounded-full 
        h-14
        w-14
        p-4
        flex
        items-center
        justify-center 
        bg-yellow-500
        hover:bg-opacity-80 
        transition 
        cursor-pointer
      ">
        <BsPlusLg size={24} color="white" />
      </div>
      <div className="
        mt-6
        hidden 
        lg:block 
        px-1
        py-2
        rounded-lg
        bg-yellow-500
        hover:opacity-80 
        cursor-pointer
      ">
        <p 
          className="
            hidden 
            lg:block 
            text-center
            font-semibold
            text-white
            text-[20px]
        ">
          Xplore Post 
        </p>
      </div>
    </div>
    </>
  );
};

export default SidebarPostButton;