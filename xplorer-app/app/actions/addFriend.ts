import axios from 'axios';



  export default async function addFriend(Id:String ,friendcode:String) {
    
    axios.post('/api/friends',{Id,friendcode});
  }