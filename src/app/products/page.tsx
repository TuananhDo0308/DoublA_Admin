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
import AddSupplierForm from "./supplierSection/addSupplierSection";
import { getSupplier } from "@/API/productAPI";
import { getProcessingOrder } from "@/API/orderAPI";
const ProductPage = () => {
    const { user } = useAuth();
    const [products, setProducts] = useState<any[]>([]);
    const [categories, setCategories] = useState<any[]>([]);
    const [activeSection, setActiveSection] = useState<string>("products");
    const [suppliers, setSuppliers]= useState<any[]>([]);
    const addItem = (newProduct: any) => {
      setProducts([...products, newProduct]);
    };
    const addSupplier = (newSupplier: any) => {
      setSuppliers([...suppliers, newSupplier]);
    };
    
    useEffect(() => {
      fetchCategories();
      fetchProducts();

      fetchSuppliers();
    }, []);

    const fetchSuppliers = async () => {
      try {
        const data = await getSupplier();
        const data2= await getProcessingOrder();

        setSuppliers(data.listSup);
        console.log("sup:",data2);
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
        <div className="mb-4 flex gap-3">
          <button 
              className="inline-flex items-center justify-center rounded-full bg-primary px-5 py-4 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10"
              onClick={() => setActiveSection("products")}
          >
            Product
          </button>
          <button 
              className="inline-flex items-center justify-center rounded-full bg-meta-3 px-5 py-4 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10"
              onClick={() => setActiveSection("categories")}
          >
            Category
          </button>
          <button 
              className="inline-flex items-center justify-center rounded-full bg-meta-6 px-5 py-4 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10"
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
        {activeSection === "categories" && (
          <div>
            <CategorySection categories={categories}  setCategories={setCategories}/>
          </div>
          )}
        {activeSection === "suppliers" && (
          <div>
            <AddSupplierForm addSupplier={addSupplier}/>
            <SupplierSection suppliers={suppliers}  setSuppliers={setSuppliers}/>
        </div>
        )}
      </DefaultLayout>
    );
  };
  
export default ProductPage;