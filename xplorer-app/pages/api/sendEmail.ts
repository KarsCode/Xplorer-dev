import type { NextApiRequest, NextApiResponse } from 'next';
import nodemailer from 'nodemailer'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    try {
      const transporter = nodemailer.createTransport({
        service: 'hotmail',
        auth: {
          user: 'RAM_page123@outlook.com', // Replace with your Gmail email
          pass: 'RAMpage@123', // Replace with your Gmail password or an app-specific password
        },
      });

      const mailOptions = {
        from: 'RAM_page123@outlook.com',
        to: 'arcotanirvesh@gmail.com', // Replace with the recipient's email address
        subject: 'Hello from My Email App',
        text: 'Its a good day to learn NextJS.',
      };

      const info = await transporter.sendMail(mailOptions);
      console.log('Email sent:', info.response);

      res.status(200).json({ message: 'Email sent successfully' });
    } catch (error) {
      console.error('Error sending email:', error);
      res.status(500).json({ error: 'Failed to send email' });
    }
  } else {
    res.status(405).end();
  }
}