"use client";
import React, { useState } from "react";
import { addNewProduct } from "@/API/productAPI"; 
import { IMG_URL } from "@/API/LinkAPI"; 
import defaultIMG from "@/assets/cog.png"; // Import your default image
import Image from "next/image";

const AddSupplierForm = ({ addItem, categories }: { addItem: any, categories: any[] }) => {
    // Initialize the product with default values, including the default image URL
    const [newProduct, setNewProduct] = useState({
        str_tensp: '',
        d_don_gia: 0,
        i_so_luong: 0,
        strimg: null as File | null, // Set as File type
        str_malh: ''
    });

    const [imagePreview, setImagePreview] = useState<string | null>(defaultIMG.src); // Use default image URL as initial preview
    const [showForm, setShowForm] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('productName', newProduct.str_tensp);
        formData.append('price', newProduct.d_don_gia.toString());
        formData.append('quantity', newProduct.i_so_luong.toString());
        formData.append('categoryId', newProduct.str_malh);  // Send category ID instead of name
        formData.append('supplierId', '1');
        formData.append('description', "Ok");


        // If a file was selected, append it, otherwise don't append any file data
        if (newProduct.strimg) {
            formData.append('profilePicture', newProduct.strimg); // Append image file if selected
        }

        try {
            const response = await addNewProduct(formData);
            console.log(response.newProduct);
            addItem(response.newProduct);
            setNewProduct({ str_tensp: '', d_don_gia: 0, i_so_luong: 0, strimg: null, str_malh: '' });
            setImagePreview(defaultIMG.src); // Reset to default image
            setShowForm(false);  // Hide form after submission
        } catch (error) {
            console.error("Failed to add item:", error);
            alert("Failed to add item. Please try again.");
        }
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setNewProduct({ ...newProduct, strimg: file }); // Store the File object

            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result as string); // Preview the image
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <>
            <button
                onClick={() => setShowForm(!showForm)}
                className="fixed top-22 right-4 p-3 bg-blue-500 text-white rounded-full"
            >
                +
            </button>
            {showForm && (
                <form onSubmit={handleSubmit} className="border p-4 shadow-md mb-4">
                    <h2 className="font-bold">Add New Product</h2>

                    <label>Product Name: </label>
                    <input
                        type="text"
                        value={newProduct.str_tensp}
                        placeholder="Enter product name"
                        onChange={(e) => setNewProduct({ ...newProduct, str_tensp: e.target.value })}
                        className="border p-2 rounded"
                        required
                    />
                    <br />

                    <label>Price: </label>
                    <input
                        type="number"
                        value={newProduct.d_don_gia}
                        placeholder="Enter price"
                        onChange={(e) => setNewProduct({ ...newProduct, d_don_gia: +e.target.value })}
                        className="border p-2 rounded"
                        required
                    />
                    <br />

                    <label>Quantity: </label>
                    <input
                        type="number"
                        value={newProduct.i_so_luong}
                        placeholder="Enter quantity"
                        onChange={(e) => setNewProduct({ ...newProduct, i_so_luong: +e.target.value })}
                        className="border p-2 rounded"
                        required
                    />
                    <br />

                    <label>Image: </label>
                    <input
                        type="file"
                        onChange={handleImageChange}
                        className="border p-2 rounded"
                    />
                    {imagePreview && <Image src={imagePreview} alt="Preview" className="mt-4" width={200} height={200} />}
                    <br />

                    <label>Category: </label>
                    <select
                        value={newProduct.str_malh}
                        onChange={(e) => setNewProduct({ ...newProduct, str_malh: e.target.value })} 
                        className="border p-2 rounded"
                        required
                    >
                        <option value="">Select Category</option>
                        {categories.map((category) => (
                            <option key={category.str_malh} value={category.str_malh}>
                                {category.str_tenlh}
                            </option>
                        ))}
                    </select>
                    <br />

                    <button type="submit" className="mt-4 p-2 bg-blue-500 text-white rounded">Add Product</button>
                </form>
            )}
        </>
    );
};

export default AddSupplierForm;