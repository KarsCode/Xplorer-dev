import prisma from '@/app/libs/prismabd'
import { NextResponse } from 'next/server';

export async function PATCH(
    request:Request
){
  const body = await request.json();
  const {
    userId,
    postId
  }=body;
  const posto = await prisma.post.findUnique({
    where:{id:postId}
  });

  if (posto) {
    if(userId in posto.likedIds){
         
    }
    else{
        posto.likedIds.push(userId);
    }
  }

 

  const updatedPost = await prisma.post.update({
    where: { id: postId },
    data: {
      likedIds: {
        push: userId,
      },
    },
  });

  return NextResponse.json(updatedPost);
}
