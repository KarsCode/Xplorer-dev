

import axios from 'axios';

const getXU = async (userId :string , targetId:string ) => {
    const response = await axios.get(`http://127.0.0.1:8000/xu/${userId}/?user2=${targetId}`);
    return response.data;
};

export default getXU;