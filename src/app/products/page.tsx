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
import SupplierSection from "./supplierSection/supplierSection";
import { getSupplier } from "@/API/productAPI";
const ProductPage = () => {
    const { user } = useAuth();
    const [products, setProducts] = useState<any[]>([]);
    const [categories, setCategories] = useState<any[]>([]);
    const [activeSection, setActiveSection] = useState<string>("products");
    const [suppliers, setSuppliers]= useState<any[]>([]);
    const addItem = (newProduct: any) => {
      setProducts([...products, newProduct]);
    };
  
    useEffect(() => {
      fetchCategories();
      fetchProducts();
      fetchSuppliers();
    }, []);
    const fetchSuppliers = async () => {
      try {
        const data = await getSupplier();
        setSuppliers(data.listSup);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };  
    // Fetch Categories
    const fetchCategories = async () => {
      try {
        const data = await getCategories();
        setCategories(data.list);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };  
    const fetchProducts = async () => {
      try {
        const data = await getProducts();
        setProducts(data.list);  
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
            className="mr-4 p-2 bg-green-500 text-white rounded" 
            onClick={() => setActiveSection("categories")}
          >
            Category
          </button>
          <button 
            className="p-2 bg-green-500 text-white rounded" 
            onClick={() => setActiveSection("suppliers")}
          >
            Supplier
          </button>
        </div>
  
        {activeSection === "products" && (
          <div>
            <AddItemForm addItem={addItem} categories={categories} suppliers={suppliers}/> {/* Pass categories here */}
            <ProductSection products={products} setProducts={setProducts} categories={categories} suppliers={suppliers} />
          </div>
        )}
        {activeSection === "categories" && <CategorySection categories={categories}  setCategories={setCategories}/>}
        {activeSection === "suppliers" && <SupplierSection suppliers={suppliers}  setSuppliers={setSuppliers}/>}
      </DefaultLayout>
    );
  };
  
export default ProductPage;