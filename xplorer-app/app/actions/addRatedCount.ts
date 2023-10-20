import axios from 'axios';



  export default async function addRatedCount(Id:String ) {
    
    axios.patch('/api/ratedcount',{Id});
  }