'use client';
import { useRouter } from "next/navigation";
import { useCallback } from "react";
import { BiArrowBack } from "react-icons/bi";
import MyListBox from "./MyListBox";
import MyCuisineBox from "./MyCuisineBox";

interface HeaderProps {
  showBackArrow?: boolean;
  label: string;
  yourVariable:string;
  setYourVariable:(value: string) => void;
}

const Header: React.FC<HeaderProps> = ({showBackArrow, label,yourVariable,setYourVariable }) => {
  const router = useRouter();

  const handleBack = useCallback(() => {
    router.back();
  }, [router]);

  return (
    <div className="border-b-[1px] twelth p-5">
      <div className="flex flex-row items-center gap-2">
        {showBackArrow && (
          <BiArrowBack 
            onClick={handleBack} 
            color="gray" 
            size={20} 
            className="
              cursor-pointer 
              hover:opacity-70 
              transition
          "/>
        )}
        <div className="ninth text-xl font-semibold flex justify-center">
          {label}
        </div>
      </div>
      <div className="text-white">
      {label === "Home" && <MyListBox yourVariable={yourVariable} setYourVariable={setYourVariable}/> }
      {label === "Restaurants" && <MyCuisineBox yourVariable={yourVariable} setYourVariable={setYourVariable}/> }
    </div>
    </div>
  );
}

export default Header;