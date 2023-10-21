import { NextApiRequest, NextApiResponse } from "next";

import prisma from '@/app/libs/prismabd';
import axios from "axios";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).end();
  }

  try {

    const userId = req.query.userId as string;
    const friendId = req.query.friendId as string;


    if ((!userId || typeof userId !== 'string')||(!friendId || typeof friendId !== 'string')) {
      return res.status(400).json({ error: 'Invalid ID' });
    }

    const response = await axios.get(`http://127.0.0.1:8000/xu/${userId}/?user2=${friendId}`);
    let restaurants;
    restaurants = await prisma.restaurant.findMany({
        where: {
       id: {
        in: response.data["Suggested"],
           },
         },
      });
    const percentage = response.data["Percentage"];

    const doc = {"restaurants":restaurants,"percentage":percentage};
    console.log(doc);
    return res.status(200).json(doc);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}