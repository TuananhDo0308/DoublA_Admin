import axios from 'axios';
import API_URL from './LinkAPI';

//Product
export const getProducts = async () => {
    const response = await axios.post(`${API_URL}/product`);
    return response.data;
};
export const addNewProduct = async (itemdata: FormData) => {
    const response = await axios.post(`${API_URL}/admin/product/addNewProduct`, itemdata, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
    return response.data;
};

export const deleteProduct = async (productId:any) => {
    console.log(productId);
    const response = await axios.post(`${API_URL}/admin/product/removeProduct`,productId);
    return response.data;
};

export const updateProduct = async (product: FormData) => {
    console.log(product);
    const response = await axios.post(`${API_URL}/admin/product/updateProduct`, product, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
    return response.data;
};

//Category
export const getCategories = async () => {
    const response = await axios.post(`${API_URL}/category`);
    console.log(response.data)
    return response.data;
};


//Supplier
export const getSupplier = async () => {
    const response = await axios.post(`${API_URL}/admin/supplier/getSupplier`);
    console.log("ok:",response.data)
    return response.data;
};

export const addNewSupplier = async (supdata: FormData) => {
    const response = await axios.post(`${API_URL}/admin/supplier/addNewSupplier`, supdata, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
    return response.data;
};