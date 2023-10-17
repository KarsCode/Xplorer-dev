import { NextApiRequest, NextApiResponse } from "next";

import prisma from '@/app/libs/prismabd';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).end();
  }

  try {

    const { userId } = req.query;



    if (!userId || typeof userId !== 'string') {
      return res.status(400).json({ error: 'Invalid ID' });
    }

    const user = await prisma.user.findUnique({
      where: {
        id:userId,
      }

    });
    

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    const friendsids = user!.friendsIds;

    // Fetch users who are in the friendIds array
    const users = await prisma.user.findMany({
      where: {
        id: {
          in: friendsids,
        },
      },
    });

    return res.status(200).json(users);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}