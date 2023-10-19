






import prisma from '@/app/libs/prismabd'
import { NextResponse } from 'next/server';

export async function POST(
    request:Request
){
    const body = await request.json();
    const{
        Id,
        friendcode,
    } = body;
    const friendUser = await prisma.user.findUnique({
        where:{friendcode:friendcode}
    });
    if(friendUser){
        const currentUser = await prisma.user.findUnique({
            where:{id:Id}
        });
    
        // Append a new name to the array.
        currentUser!.friendsIds.push(friendUser!.id);
    
        // Update the currentUser! in the database.
        const updatedUser = await prisma.user.update({
          where: {
            id: currentUser!.id,
          },
          data: {
            friendsIds: {
              set: currentUser!.friendsIds, // Update the array field with the modified array.
            },
          },
        });
        return NextResponse.json(updatedUser);

    }
    else{
        return NextResponse.json(friendUser);
    }

    

      
}
