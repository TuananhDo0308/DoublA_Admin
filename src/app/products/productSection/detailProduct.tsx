"use client";
import React, { useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Image from "next/image";
import { IMG_URL } from "@/API/LinkAPI";
import { updateProduct } from "@/API/productAPI";

// Validation schema
const schema = yup.object().shape({
  str_tensp: yup.string().required("Product name is required"),
  d_don_gia: yup.number().required("Price is required").min(0, "Price must be greater than or equal to 0"),
  i_so_luong: yup.number().required("Quantity is required").min(0, "Quantity must be greater than or equal to 0"),
  str_malh: yup.string().required("Category is required"),
  str_mancc: yup.string().required("Supplier is required"),
  txt_mo_ta: yup.string(),
  profilePicture: yup.mixed().notRequired(),
});

export default function DetailProduct({ product, categories, suppliers, onClose, onSave }) {
  const methods = useForm({
    resolver: yupResolver(schema),
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

  const { handleSubmit, setValue, watch, formState: { errors } } = methods;
  const profilePicture = watch("profilePicture");

  const handleProfilePictureChange = (e) => {
    debugger;
    const file = e.target.files[0];
    if (file) {
      setValue("profilePicture", file, { shouldValidate: true });
      console.log(file);  // Log to check if the file is properly captured
    }
  };
  

  const onSubmit = async (data) => {
    try {
      console.log("img",data.profilePicture);
      const formData = new FormData();
      formData.append("productId", product.str_masp);
      formData.append("newName", data.str_tensp);
      formData.append("price", data.d_don_gia);
      formData.append("quantity", data.i_so_luong);
      formData.append("categoryId", data.str_malh);
      formData.append("supplierId", data.str_mancc);
      formData.append("description", data.txt_mo_ta);
      
      // Append image only if new file is selected
      if (data.profilePicture instanceof File) {
        formData.append("profilePicture", data.profilePicture);
      }

      const response = await updateProduct(formData);
      console.log(response.product);
      // onSave(response.product); // Trigger save callback
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
              <div className="mt-1 flex items-center">
                {profilePicture instanceof File ? (
                  <Image
                    src={URL.createObjectURL(profilePicture)}
                    alt="Product Image Preview"
                    className="rounded-full object-cover cursor-pointer"
                    width={150}
                    height={150}
                    onClick={() => document.getElementById('profilePictureInput').click()}
                  />
                ) : (
                  <Image
                    src={`${IMG_URL}/${product?.strimg}`}
                    alt="Product Image"
                    className="rounded-full object-cover cursor-pointer"
                    width={150}
                    height={150}
                    onClick={() => document.getElementById('profilePictureInput').click()}
                  />
                )}
                <input
                  type="file"
                  id="profilePictureInput"
                  accept="image/*"
                  className="hidden"
                  onChange={handleProfilePictureChange}
                />
              </div>
            </div>

            {/* Name Input */}
            <div>
              <label className="block text-lg font-bold mt-2 text-gray-700">Product Name</label>
              <input
                className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm ${errors.str_tensp ? "border-red-500" : ""}`}
                type="text"
                {...methods.register("str_tensp")}
              />
              {errors.str_tensp && <p className="text-red-500 text-sm">{errors.str_tensp.message}</p>}
            </div>

            {/* Price Input */}
            <div>
              <label className="block text-lg font-bold mt-2 text-gray-700">Price</label>
              <input
                className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm ${errors.d_don_gia ? "border-red-500" : ""}`}
                type="number"
                {...methods.register("d_don_gia")}
              />
              {errors.d_don_gia && <p className="text-red-500 text-sm">{errors.d_don_gia.message}</p>}
            </div>

            {/* Quantity Input */}
            <div>
              <label className="block text-lg font-bold mt-2 text-gray-700">Quantity</label>
              <input
                className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm ${errors.i_so_luong ? "border-red-500" : ""}`}
                type="number"
                {...methods.register("i_so_luong")}
              />
              {errors.i_so_luong && <p className="text-red-500 text-sm">{errors.i_so_luong.message}</p>}
            </div>

            {/* Category Select */}
            <div>
              <label className="block text-lg font-bold mt-2 text-gray-700">Category</label>
              <select
                className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm ${errors.str_malh ? "border-red-500" : ""}`}
                {...methods.register("str_malh")}
              >
                {categories.map((cat) => (
                  <option key={cat.str_malh} value={cat.str_malh}>
                    {cat.str_tenlh}
                  </option>
                ))}
              </select>
              {errors.str_malh && <p className="text-red-500 text-sm">{errors.str_malh.message}</p>}
            </div>

            {/* Supplier Select */}
            <div>
              <label className="block text-lg font-bold mt-2 text-gray-700">Supplier</label>
              <select
                className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm ${errors.str_mancc ? "border-red-500" : ""}`}
                {...methods.register("str_mancc")}
              >
                {suppliers.map((sup) => (
                  <option key={sup.str_mancc} value={sup.str_mancc}>
                    {sup.str_tenncc}
                  </option>
                ))}
              </select>
              {errors.str_mancc && <p className="text-red-500 text-sm">{errors.str_mancc.message}</p>}
            </div>

            {/* Description Input */}
            <div>
              <label className="block text-lg font-bold mt-2 text-gray-700">Description</label>
              <textarea
                className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm ${errors.txt_mo_ta ? "border-red-500" : ""}`}
                {...methods.register("txt_mo_ta")}
              />
              {errors.txt_mo_ta && <p className="text-red-500 text-sm">{errors.txt_mo_ta.message}</p>}
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
