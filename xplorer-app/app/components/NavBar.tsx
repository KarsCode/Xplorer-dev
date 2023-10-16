'use client';
import Button from "./Button";
import { signOut } from "next-auth/react";
import { User } from "@prisma/client";

interface NavBarProps {
    currentUser: User | null | undefined,
  }


const NavBar: React.FC<NavBarProps> = ({
    currentUser
  }) => {
    return ( 
        <div>
            console
            {currentUser && <Button onClick={() => {signOut()}} label="Logout" />}
        
        </div>
        
    )
};
 
export default NavBar;