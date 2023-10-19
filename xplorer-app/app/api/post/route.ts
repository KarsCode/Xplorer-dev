import getCurrentUser from '@/app/actions/getCurrentUser';
import prisma from '@/app/libs/prismabd'
import { latLng } from 'leaflet';
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
          image,
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
            image,
            title,
            description,
            date,
            userId:currentUser.id

        }
    });
    return NextResponse.json(post);  
}