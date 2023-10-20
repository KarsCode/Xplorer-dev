import { NextApiRequest, NextApiResponse } from "next";

import serverAuth from "@/app/libs/serverAuth";
import prisma from "@/app/libs/prismabd";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST' && req.method !== 'GET') {
    return res.status(405).end();
  }

  try {
    
    if (req.method === 'POST') {
      const { currentUser } = await serverAuth(req, res);
      const { body } = req.body;


      const {title, tag , latitude , longitude , eventImage ,description , date }=body;
      const post = await prisma.post.create({
        data: {
          title, 
          tag , 
          latitude ,
           longitude , 
           eventImage ,
           description , 
           date,
          userId: currentUser.id
        }
      });

      return res.status(200).json(post);
    }

    if (req.method === 'GET') {

      let posts;
        posts = await prisma.post.findMany({
          include: {
            comments: true
          },
          orderBy: {
            createdAt: 'desc'
          }
        });

      return res.status(200).json(posts);
    }
  
}catch (error) {
    console.log(error);
    return res.status(400).end();
  }
}