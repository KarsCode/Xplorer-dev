import axios from 'axios';

export default async function sendEmail(email:string,subject:string,content:string) {

        axios.post('/api/email',{email,subject,content});
  }