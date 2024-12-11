"use client"
import React, { useState } from "react";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { getProducts, getCategories, getSupplier } from "@/API/productAPI";
import ProductSection from "@/app/products/productSection/productSection";
import AddItemForm from "./productSection/addItemSection";
import CategorySection from "./categorySection/catergorySection";
import SupplierSection from "./supplierSection/supplierSection";
import AddSupplierForm from "./supplierSection/addSupplierSection";

// This function will run on the server
export default async function ProductPage() {
  // Fetch data from API
  const productsData = await getProducts();
  const categoriesData = await getCategories();
  const suppliersData = await getSupplier();

  const initialProducts = productsData.list || [];
  const initialCategories = categoriesData.list || [];
  const initialSuppliers = suppliersData.listSup || [];

  return (
    <ServerSideComponent
      initialProducts={initialProducts}
      initialCategories={initialCategories}
      initialSuppliers={initialSuppliers}
    />
  );
}

// Separate client-side logic into a Client Component
function ServerSideComponent({ initialProducts, initialCategories, initialSuppliers }: any) {
  const [products, setProducts] = useState(initialProducts);
  const [categories, setCategories] = useState(initialCategories);
  const [suppliers, setSuppliers] = useState(initialSuppliers);
  const [activeSection, setActiveSection] = useState<string>("products");

  const addItem = (newProduct: any) => {
    setProducts([...products, newProduct]);
  };

  const addSupplier = (newSupplier: any) => {
    setSuppliers([...suppliers, newSupplier]);
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
          <AddItemForm addItem={addItem} categories={categories} suppliers={suppliers} />
          <ProductSection products={products} setProducts={setProducts} categories={categories} suppliers={suppliers} />
        </div>
      )}
      {activeSection === "categories" && (
        <div>
          <CategorySection categories={categories} setCategories={setCategories} />
        </div>
      )}
      {activeSection === "suppliers" && (
        <div>
          <AddSupplierForm addSupplier={addSupplier} />
          <SupplierSection suppliers={suppliers} setSuppliers={setSuppliers} />
        </div>
      )}
    </DefaultLayout>
  );
}
