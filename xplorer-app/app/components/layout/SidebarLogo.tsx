"use client"; 
import { useRouter } from "next/navigation";
import Logo from "@/app/components/Logo";

const SidebarLogo = () => {
  const router = useRouter();
  
  return (
    <div className="hidden lg:block text-white text-xl ">
      <div 
      onClick={() => router.push('/')}
      className="
      rounded-full 
      h-140
      w-140
      p-4 
      flex 
      items-center 
      justify-center 
      cursor-pointer
      transition-ease-in-out
        delay-100
        hover:-translate-y-1 
        hover:scale-110
        duration-300
    ">
      <Logo/>
    </div>
    </div>
  );
};

export default SidebarLogo;
