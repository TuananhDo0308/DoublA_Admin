"use client";
import React, { useEffect, useState } from "react";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { useAuth } from "@/context/AuthContext";
import { getProducts, getCategories } from "@/API/productAPI";
import Image from "next/image";
import { IMG_URL } from "@/API/LinkAPI";

// Product Section Component with Editable Inputs including Category Combobox
const ProductSection = ({ products, setProducts, categories }: { products: any[], setProducts: any, categories: any[] }) => {

  const [editingIndex, setEditingIndex] = useState<number | null>(null);

  const handleInputChange = (index: number, field: string, value: any) => {
    const updatedProducts = [...products];
    updatedProducts[index] = {
      ...updatedProducts[index],
      [field]: value,
    };
    setProducts(updatedProducts);
  };

  const handleSave = (index: number) => {
    // Here you could also send updated data to the server
    setEditingIndex(null); // End editing mode
  };

  const handleEdit = (index: number) => {
    setEditingIndex(index); // Start editing mode
  };

  const handleDelete = (index: number) => {
    const updatedProducts = products.filter((_, i) => i !== index);
    setProducts(updatedProducts); // Delete the product from the list
  };

  return (
    <div>
      {products.map((product, index) => (
        <div key={index} className="border p-4 shadow-md mb-4 flex justify-between items-center">
          <div className="flex items-center">
            <Image
              src={`${IMG_URL}/${product.strimg}`}
              alt={product.str_tensp}
              width={60}
              height={50}
            />
            <div className="ml-4">
              {editingIndex === index ? (
                <input
                  type="text"
                  value={product.str_tensp}
                  onChange={(e) => handleInputChange(index, 'str_tensp', e.target.value)}
                  className="border p-2 rounded mb-2"
                />
              ) : (
                <h2 className="font-bold">{product.str_tensp}</h2>
              )}

              {editingIndex === index ? (
                <div>
                  <label>Price: </label>
                  <input
                    type="number"
                    value={product.d_don_gia}
                    onChange={(e) => handleInputChange(index, 'd_don_gia', e.target.value)}
                    className="border p-2 rounded"
                  />
                  <br />

                  <label>Quantity: </label>
                  <input
                    type="number"
                    value={product.i_so_luong}
                    onChange={(e) => handleInputChange(index, 'i_so_luong', e.target.value)}
                    className="border p-2 rounded"
                  />
                  <br />

                  <label>Category: </label>
                  <select
                    value={product.str_malh}
                    onChange={(e) => handleInputChange(index, 'str_malh', e.target.value)}
                    className="border p-2 rounded"
                  >
                    {categories.map((category) => (
                      <option key={category.str_malh} value={category.str_malh}>
                        {category.str_tenlh}
                      </option>
                    ))}
                  </select>
                </div>
              ) : (
                <>
                  <p>Price: ${product.d_don_gia}</p>
                  <p>Quantity: {product.i_so_luong}</p>
                  <p>Category: {product.categoryName}</p>
                </>
              )}
            </div>
          </div>
          <div>
            {editingIndex === index ? (
              <button
                onClick={() => handleSave(index)}
                className="p-2 bg-blue-500 text-white rounded"
              >
                Save
              </button>
            ) : (
              <button
                onClick={() => handleEdit(index)}
                className="p-2 bg-yellow-500 text-white rounded"
              >
                Edit
              </button>
            )}
            <button
              onClick={() => handleDelete(index)}
              className="p-2 bg-red-500 text-white rounded ml-2"
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductSection;
