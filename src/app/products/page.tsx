"use client";
import React, { useEffect, useState } from "react";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { useAuth } from "@/context/AuthContext";
import { getProducts, getCategories } from "@/API/productAPI";
import Image from "next/image";
import { IMG_URL } from "@/API/LinkAPI";
import ProductSection from "@/app/products/productSection/productSection"
import AddItemForm from "./productSection/addItemSection";
import CategorySection from "./categorySection/catergorySection";
const ProductPage = () => {
    const { user } = useAuth();
    const [products, setProducts] = useState<any[]>([]);
    const [categories, setCategories] = useState<any[]>([]);
    const [activeSection, setActiveSection] = useState<string>("products");
  
    const addItem = (newProduct: any) => {
      setProducts([...products, newProduct]);
    };
  
    useEffect(() => {
      fetchCategories();
    }, []);
  
    // Fetch Categories
    const fetchCategories = async () => {
      try {
        const data = await getCategories();
        setCategories(data.list);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
  
    useEffect(() => {
      if (categories.length > 0) {
        fetchProducts();
      }
    }, [categories]);
  
    const fetchProducts = async () => {
      try {
        const data = await getProducts();
        const updatedProducts = data.list.map((product: any) => {
          const category = categories.find(
            (cat) => cat.str_malh === product.str_malh
          );
          return {
            ...product,
            categoryName: category ? category.str_tenlh : "Unknown",
          };
        });
        setProducts(updatedProducts);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
  
    return (
      <DefaultLayout>
        <div className="mb-4">
          <button 
            className="mr-4 p-2 bg-blue-500 text-white rounded" 
            onClick={() => setActiveSection("products")}
          >
            Product
          </button>
          <button 
            className="p-2 bg-green-500 text-white rounded" 
            onClick={() => setActiveSection("categories")}
          >
            Category
          </button>
        </div>
  
        {activeSection === "products" && (
          <div>
            <AddItemForm addItem={addItem} categories={categories} /> {/* Pass categories here */}
            <ProductSection products={products} setProducts={setProducts} categories={categories} />
          </div>
        )}
        {activeSection === "categories" && <CategorySection categories={categories}  setCategories={setCategories}/>}
      </DefaultLayout>
    );
  };
  
export default ProductPage;