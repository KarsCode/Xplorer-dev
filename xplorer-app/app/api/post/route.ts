import getCurrentUser from '@/app/actions/getCurrentUser';
import prisma from '@/app/libs/prismabd'
import { NextResponse } from 'next/server';

export async function POST(
    request:Request
){
    const currentUser =( await getCurrentUser())?.currentUser;

        if (!currentUser) {
            return NextResponse.error();
        }
    const body = await request.json();
    const{
          tag,
          eventImage,
          title,
          description,
          date,
          latitude,
          longitude
         } = body;

    const post = await prisma.post.create({
        data:{
            tag,
            latitude:latitude,
            longitude:longitude,
            eventImage:eventImage,
            title,
            description,
            date,
            userId:currentUser.id,

        }
    });
    return NextResponse.json(post);  
}







