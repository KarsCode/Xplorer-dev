'use client';
import getFriends from "@/app/actions/getFriends";
import { User } from "@prisma/client";
import Avatar from "../Avatar";

interface SidebarProps {
  currentUser: User | null | undefined,
}



const FriendsBar: React.FC<SidebarProps> = ({currentUser}) => {

  const {data:users=[]}=getFriends(currentUser!.id); 
    return ( 
    <div className="px-6 py-4 hidden lg:block">
      <div className="bg-neutral-800 rounded-xl p-4">
        <h2 className="text-white text-xl font-semibold">Friends</h2>
        <div className="flex flex-col gap-6 mt-4">
          {users.map((user:Record<string,any>)=>(
            <div key={user.id}className="flex flex-row gap-4">
                <Avatar userId={user.id}/>
                <div className="flex flex-col">
                  <p className="text-white font-semibold text-sm">
                    {user.name}
                  </p>
                  <p className="text-neutral-400 text-sm">
                    @{user.username}
                    
                  </p>
                </div>
            </div>
          ))}
        </div>
      </div>
    </div>

    
    );
}
 
export default FriendsBar;