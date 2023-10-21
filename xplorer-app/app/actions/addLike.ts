import axios from 'axios';



  export default async function addLike(userId:String ,postId:String) {

    axios.patch('/api/likes',{userId,postId});

  }