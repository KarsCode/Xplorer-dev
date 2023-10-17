import type { NextApiRequest, NextApiResponse } from 'next';
import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer'




  



export async function POST(
    request:Request
){
    const body= await request.json();

    const {
        email,
        subject,
        content,
    } = body;
    const transporter = nodemailer.createTransport({
        service: 'hotmail',
        auth: {
          user: 'RAM_page123@outlook.com', // Replace with your Gmail email
          pass: 'RAMpage@123', // Replace with your Gmail password or an app-specific password
        },
      });
    const mailOptions = {
        from: 'RAM_page123@outlook.com',
        to: email, // Replace with the recipient's email address
        subject: subject,
        text: content,
      };
    const info = await transporter.sendMail(mailOptions);
    return NextResponse.json(info);
}

