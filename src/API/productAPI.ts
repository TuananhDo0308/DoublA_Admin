import axios from 'axios';
import API_URL from './LinkAPI';

export const getProducts = async () => {
    const response = await axios.post(`${API_URL}/product`);
    return response.data;
};
export const addNewProduct = async (data: any) => {
    const response = await axios.post(`${API_URL}/admin/product/addNewProduct`, data, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
    return response.data;
};
export const getCategories = async () => {
    const response = await axios.post(`${API_URL}/category`);
    console.log(response.data)
    return response.data;
};