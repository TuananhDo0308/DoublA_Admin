import axios from 'axios';
import API_URL from './LinkAPI';

export const loginAdmin = async (credentials: any) => {
    console.log("Cre: ",credentials);
    const response = await axios.post(`${API_URL}/admin/signin`, credentials);
    return response.data;
};;