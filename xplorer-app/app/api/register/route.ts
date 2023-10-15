import bcrypt from 'bcrypt';
import prisma from '@/app/libs/prismabd'
import { NextResponse } from 'next/server';

export async function POST(
    request:Request
){
    const body = await request.json();
    const{
        email,
        name,
        username,
        password,

    } = body;
    function generateRandomString(): string {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$?';
        let randomString = '';
        for (let i = 0; i < 8; i++) {
          const randomIndex = Math.floor(Math.random() * characters.length);
          randomString += characters.charAt(randomIndex);
        }
        return randomString;
      }
    const friendcode=generateRandomString();
    const hashedPassword=await bcrypt.hash(password,12);
    const user = await prisma.user.create({
        data:{
            email,
            name,
            username,
            hashedPassword,
            friendcode,

        }
    });
    return NextResponse.json(user);  
}
    