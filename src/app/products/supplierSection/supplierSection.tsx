import React, { useState } from "react";
import MoreVertIcon from "@mui/icons-material/MoreVert"; // Material-UI Icons
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import SaveIcon from "@mui/icons-material/Save";
import IconButton from "@mui/material/IconButton";
import { removeSupplier } from "@/API/productAPI";

// supplier Section Component
const SupplierSection = ({ suppliers, setSuppliers }: { suppliers: any[], setSuppliers: any }) => {
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [newSupplierName, setNewSupplierName] = useState<string>("");
  const [showActions, setShowActions] = useState<number | null>(null); // Tracks which row's action menu is open

  const handleEdit = (index: number, currentName: string) => {
    setEditingIndex(index);
    setNewSupplierName(currentName);
    setShowActions(null); 
  };

  const handleSave = (index: number) => {
    const updatedSuppliers = [...suppliers];
    updatedSuppliers[index].str_tenncc = newSupplierName;
    setSuppliers(updatedSuppliers);
    setEditingIndex(null);
  };

  const handleDelete = async(index: number, str_mancc: string) => {
    try {
      await removeSupplier(str_mancc);
      alert("Delete Successful!!!")

      const updatedSuppliers = suppliers.filter((_, supIndex) => supIndex !== index);
    setSuppliers(updatedSuppliers);
    } catch (error) {
        console.error("Failed to delete supplier", error);
    }
  };

  const handleAddsupplier = () => {
    const newSupplier = {
      str_mancc: "", // Unique ID
      str_tenncc: ""
    };
    const updatedSuppliers = [...suppliers, newSupplier];
    setSuppliers([...suppliers, newSupplier]);
    setEditingIndex(updatedSuppliers.length - 1)
    setNewSupplierName("")
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
              autoFocus
              required
            />
          ) : (
            <h2 className="font-bold">{supplier.str_tenncc}</h2>
          )}
          <div className="relative col-span-1 flex items-center">
            {editingIndex === index ? (
              <IconButton
                aria-label="save"
                onClick={() => handleSave(index)}
              >
                <SaveIcon />
              </IconButton>
            ) : (
              <IconButton
                aria-label="actions"
                onClick={() =>
                  setShowActions(showActions === index ? null : index)
                }
              >
                <MoreVertIcon />
              </IconButton>
            )}

            {showActions === index && editingIndex !== index && (
              <div className="absolute right-0 top-10 z-10 rounded border bg-white p-2 shadow-md">
                <IconButton
                  aria-label="edit"
                  className="text-white"
                  onClick={() => handleEdit(index, supplier.str_tenncc)} // Trigger edit on click
                >
                  <EditIcon />
                </IconButton>
                <IconButton
                  aria-label="delete"
                  onClick={() => handleDelete(index, supplier.str_mancc)}
                >
                  <DeleteIcon />
                </IconButton>
              </div>
            )}
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
