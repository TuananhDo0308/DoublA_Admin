"use client";
import React, { useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import Image from "next/image";
import { IMG_URL } from "@/API/LinkAPI";
import { updateProduct } from "@/API/productAPI";
import defaultIMG from "@/assets/cog.png"; // Use your own default image

export default function DetailProduct({ product, categories, suppliers, onClose, onSave }) {
  const methods = useForm({
    defaultValues: {
      str_tensp: product?.str_tensp || "",
      d_don_gia: product?.d_don_gia || 0,
      i_so_luong: product?.i_so_luong || 0,
      str_malh: product?.str_malh || "",
      str_mancc: product?.Supplier?.str_mancc || "",
      txt_mo_ta: product?.txt_mo_ta || "",
    },
    mode: "onTouched",
  });

  const { handleSubmit, setValue, watch } = methods;
  const [imagePreview, setImagePreview] = useState(product?.strimg ? `${IMG_URL}/${product.strimg}` : defaultIMG.src); // Preview image

  const handleProfilePictureChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setValue("profilePicture", file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string); // Update preview with selected image
      };
      reader.readAsDataURL(file);
    }
  };

  const onSubmit = async (data) => {
    try {
      const formData = new FormData();
      formData.append("productId", product.str_masp);
      formData.append("newName", data.str_tensp);
      formData.append("price", data.d_don_gia);
      formData.append("quantity", data.i_so_luong);
      formData.append("categoryId", data.str_malh);
      formData.append("supplierId", data.str_mancc);
      formData.append("description", data.txt_mo_ta);
    
      // Append image only if a new file is selected
      if (data.profilePicture instanceof File) {
        formData.append("profilePicture", data.profilePicture);
      }
      const response = await updateProduct(formData);
      console.log(response.product);
      onSave(response.product)

      onClose(); // Close the modal after saving
    } catch (error) {
      console.error("Failed to update product:", error);
      alert("Failed to update product. Please try again.");
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="relative w-full max-w-lg bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-3xl font-bold text-blue-800 mb-4">Edit Product</h2>

        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(onSubmit)}>
            {/* Image Upload */}
            <div>
          <label className="block text-lg font-bold text-gray-700">Product Image</label>
          <div className="mt-1 flex flex-col items-center">
            {/* Image preview */}
            <Image
              src={imagePreview}
              alt="Product Image Preview"
              className="rounded-full object-cover cursor-pointer"
              width={150}
              height={150}
            />
            {/* File input */}
            <input
              type="file"
              id="profilePictureInput"
              accept="image/*"
              className="mt-4 bg-primary px-6 py-2 rounded-lg text-white text-center font-medium hover:bg-opacity-90"
              onChange={handleProfilePictureChange}
            />
          </div>
        </div>


            {/* Name Input */}
            <div>
              <label className="block text-lg font-bold mt-2 text-gray-700">Product Name</label>
              <input
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                type="text"
                {...methods.register("str_tensp")}
              />
            </div>

            {/* Price Input */}
            <div>
              <label className="block text-lg font-bold mt-2 text-gray-700">Price</label>
              <input
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                type="number"
                {...methods.register("d_don_gia")}
              />
            </div>

            {/* Quantity Input */}
            <div>
              <label className="block text-lg font-bold mt-2 text-gray-700">Quantity</label>
              <input
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                type="number"
                {...methods.register("i_so_luong")}
              />
            </div>

            {/* Category Select */}
            <div>
              <label className="block text-lg font-bold mt-2 text-gray-700">Category</label>
              <select
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                {...methods.register("str_malh")}
              >
                {categories.map((cat) => (
                  <option key={cat.str_malh} value={cat.str_malh}>
                    {cat.str_tenlh}
                  </option>
                ))}
              </select>
            </div>

            {/* Supplier Select */}
            <div>
              <label className="block text-lg font-bold mt-2 text-gray-700">Supplier</label>
              <select
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                {...methods.register("str_mancc")}
              >
                {suppliers.map((sup) => (
                  <option key={sup.str_mancc} value={sup.str_mancc}>
                    {sup.str_tenncc}
                  </option>
                ))}
              </select>
            </div>

            {/* Description Input */}
            <div>
              <label className="block text-lg font-bold mt-2 text-gray-700">Description</label>
              <textarea
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                {...methods.register("txt_mo_ta")}
              />
            </div>

            {/* Modal Actions */}
            <div className="mt-6 flex justify-end space-x-2">
              <button
                onClick={onClose}
                className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
              >
                Save
              </button>
            </div>
          </form>
        </FormProvider>
      </div>
    </div>
  );
}
