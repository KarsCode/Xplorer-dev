
import prisma from '@/app/libs/prismabd'
import { NextResponse } from 'next/server';

export async function POST(
    request:Request
){
    const body = await request.json();
    const{
        email,
        lat,
        long,
    } = body;
    const updatedUser = await prisma.user.update({
        where:{email:email},
        data:{
            latitude:lat,
            longitude:long,
        }
    });
    return NextResponse.json(updatedUser);  
}