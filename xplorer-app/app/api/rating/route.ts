import prisma from '@/app/libs/prismabd'
import { NextResponse } from 'next/server';



async function updateAverageRating(restaurantId: string) {
  try {
    const restaurant = await prisma.restaurant.findUnique({
      where: { 
        id: restaurantId
     },
      include: { ratings: true },
    });

    if (!restaurant) {

      return;
    }

    const ratings = restaurant.ratings.map((rating) => rating.rating);
    const rating =
      ratings.reduce((sum, rating) => sum + rating, 0) / ratings.length;

    await prisma.restaurant.update({
      where: { id: restaurantId },
      data: { rating:rating },
    });
  } catch (error) {
    console.error('Error updating average rating:', error);
  }
}




export async function POST(
    request:Request
){
    const body = await request.json();
    const{
        resId,
        userId,
        rating
    } = body;

    const rest = await prisma.rating.findMany({
      where:{
        userId:userId,
        restaurantId:resId
      }
    });
    console.log(rest.length)
    console.log(rest);

    if(rest.length>0){

      return NextResponse.error();
    }
    const user = await prisma.rating.create({
        data:{
            restaurantId:resId,
            userId:userId,
            rating:rating,
        }
    });
    updateAverageRating(resId);
        return NextResponse.json(user); 
}