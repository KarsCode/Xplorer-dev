import prisma from '@/app/libs/prismabd'
import { NextResponse } from 'next/server';

export async function PATCH(
    request:Request
){
  const body = await request.json();
  const {
    Id
  }=body;
  const currentUser = await prisma.user.findUnique({
    where:{id:Id}
  });

  currentUser!.ratedCount=currentUser!.ratedCount+1;

  const updatedUser = await prisma.user.update({
    where: {
      id: currentUser!.id,
    },
    data: {
      ratedCount: {
        set: currentUser!.ratedCount, 
      },
    },
  });
  return NextResponse.json(updatedUser);
}






