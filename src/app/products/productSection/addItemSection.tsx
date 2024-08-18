"use client";
import React, { useEffect, useState } from "react";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { useAuth } from "@/context/AuthContext";
import { getProducts, getCategories } from "@/API/productAPI";
import Image from "next/image";
import { IMG_URL } from "@/API/LinkAPI";

// Add Item Form Component with Image Preview and Category Combobox
const AddItemForm = ({ addItem, categories }: { addItem: any, categories: any[] }) => {
    const [newProduct, setNewProduct] = useState({
        str_tensp: '',
        d_don_gia: 0,
        i_so_luong: 0,
        strimg: '',
        categoryName: ''
    });

    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [showForm, setShowForm] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        addItem(newProduct);  // Call addItem function passed from the parent
        setNewProduct({ str_tensp: '', d_don_gia: 0, i_so_luong: 0, strimg: '', categoryName: '' });  // Clear form
        setImagePreview(null);  // Clear image preview
        setShowForm(false);  // Hide form after submission
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setNewProduct({ ...newProduct, strimg: file.name });
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result as string);
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
                        onChange={(e) => setNewProduct({ ...newProduct, str_tensp: e.target.value })}
                        className="border p-2 rounded"
                        required
                    />
                    <br />
                    <label>Price: </label>
                    <input
                        type="number"
                        value={newProduct.d_don_gia}
                        onChange={(e) => setNewProduct({ ...newProduct, d_don_gia: +e.target.value })}
                        className="border p-2 rounded"
                        required
                    />
                    <br />
                    <label>Quantity: </label>
                    <input
                        type="number"
                        value={newProduct.i_so_luong}
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
                        required
                    />
                    {imagePreview && <img src={imagePreview} alt="Preview" className="mt-4" width={200} />}
                    <br />
                    <label>Category: </label>
                    <select
                        value={newProduct.categoryName}
                        onChange={(e) => setNewProduct({ ...newProduct, categoryName: e.target.value })}
                        className="border p-2 rounded"
                        required
                    >
                        <option value="">Select Category</option>
                        {categories.map((category) => (
                            <option key={category.str_malh} value={category.str_tenlh}>
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

export default AddItemForm;