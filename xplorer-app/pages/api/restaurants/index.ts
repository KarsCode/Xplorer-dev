import { NextApiRequest, NextApiResponse } from "next";

import serverAuth from "@/app/libs/serverAuth";
import prisma from "@/app/libs/prismabd";
import axios from "axios";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST' && req.method !== 'GET') {
    return res.status(405).end();
  }

  try {
    
    if (req.method === 'POST') {
      const { currentUser } = await serverAuth(req, res);
      const { name, longitude,latitude,cuisines,image,locality } = req.body;

      const post = await prisma.restaurant.create({
        data: {
          name,
          longitude,
          latitude,
          image,
          locality,
        }
      });

      return res.status(200).json(post);
    }

    if (req.method === 'GET') {
        const { currentUser } = await serverAuth(req, res);

      let posts;
      if(currentUser.ratedCount<5){
        posts = await prisma.restaurant.findMany({
          where:{
            latitude:{
                gt: (currentUser.latitude! - 0.539956806 ), //60kms in degrees 111.12 kms = 1 degree
                lt: (currentUser.latitude! + 0.539956806 )
            },
            longitude:{
                gt: (currentUser.longitude! - 0.539956806 ), //60kms in degrees 111.12 kms = 1 degree
                lt: (currentUser.longitude! + 0.539956806 )
            }
          },
          orderBy: {
            rating: 'desc'
          }
        });
      }
      else{
        const userId=currentUser.id;
        const response = await axios.get(`http://127.0.0.1:8000/recommendations/${userId}`);
        posts = await prisma.restaurant.findMany({
          where: {
         id: {
          in: response.data,
             },
           },
        });

      }
      return res.status(200).json(posts);
    }
  
}catch (error) {
    console.log(error);
    return res.status(400).end();
  }
}