'use client';
import Button from "../Button";
import { signOut } from "next-auth/react";
import { User } from "@prisma/client";
import addFriend from "@/app/actions/addFriend";

interface NavBarProps {
    currentUser: User | null | undefined,
  }


const NavBar: React.FC<NavBarProps> = ({
    currentUser
  }) => {
    return ( 
        <div>
            console
            {currentUser && <Button onClick={() => {addFriend(currentUser.id,"cTxb4NnN")}} label="Logout" />}
        
        </div>
        
    )
};
 
export default NavBar;

