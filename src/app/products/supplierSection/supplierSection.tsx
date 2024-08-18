import React, { useState } from "react";

// supplier Section Component
const SupplierSection = ({ suppliers, setSuppliers }: { suppliers: any[], setSuppliers: any }) => {
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [newSupplierName, setNewSupplierName] = useState<string>("");

  const handleEdit = (index: number, currentName: string) => {
    setEditingIndex(index);
    setNewSupplierName(currentName);
  };

  const handleSave = (index: number) => {
    const updatedSuppliers = [...suppliers];
    updatedSuppliers[index].str_tenncc = newSupplierName;
    setSuppliers(updatedSuppliers);
    setEditingIndex(null);
  };

  const handleDelete = (index: number) => {
    const updatedSuppliers = suppliers.filter((_, supIndex) => supIndex !== index);
    setSuppliers(updatedSuppliers);
  };

  const handleAddsupplier = () => {
    const newSupplier = {
      str_mancc: `${suppliers.length + 1}`, // Unique ID
      str_tenncc: "New supplier"
    };
    setSuppliers([...suppliers, newSupplier]);
  };

  return (
    <div>
      {suppliers.map((supplier, index) => (
        <div key={index} className="border p-4 shadow-md flex items-center justify-between">
          {editingIndex === index ? (
            <input
              type="text"
              value={newSupplierName}
              onChange={(e) => setNewSupplierName(e.target.value)}
              className="border p-2 rounded"
            />
          ) : (
            <h2 className="font-bold">{supplier.str_tenncc}</h2>
          )}
          <div className="space-x-2">
            {editingIndex === index ? (
              <button
                onClick={() => handleSave(index)}
                className="p-2 bg-blue-500 text-white rounded"
              >
                Save
              </button>
            ) : (
              <button
                onClick={() => handleEdit(index, supplier.str_tenncc)}
                className="p-2 bg-yellow-500 text-white rounded"
              >
                Edit
              </button>
            )}
            <button
              onClick={() => handleDelete(index)}
              className="p-2 bg-red-500 text-white rounded"
            >
              Delete
            </button>
          </div>
        </div>
      ))}
      <button
        onClick={handleAddsupplier}
        className="mt-4 p-2 bg-green-500 text-white rounded"
      >
        Add New supplier
      </button>
    </div>
  );
};

export default SupplierSection;
