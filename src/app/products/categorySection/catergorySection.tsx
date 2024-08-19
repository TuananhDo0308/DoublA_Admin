import React, { useState } from "react";
import MoreVertIcon from "@mui/icons-material/MoreVert"; // Material-UI Icons
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import SaveIcon from "@mui/icons-material/Save";
import IconButton from "@mui/material/IconButton";
// Category Section Component
const CategorySection = ({ categories, setCategories }: { categories: any[], setCategories: any }) => {
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [newCategoryName, setNewCategoryName] = useState<string>("");
  const [showActions, setShowActions] = useState<number | null>(null); // Tracks which row's action menu is open

  const handleOpenDetail = (product: any) => {
    setEditingIndex(null); // Exit edit mode
    setShowActions(null);
  };

  const handleEdit = (index: number, currentName: string) => {
    setEditingIndex(index);
    setNewCategoryName(currentName);
    setShowActions(null); // Hide action menu when editing starts
  };

  const handleSave = (index: number) => {
    const updatedCategories = [...categories];
    updatedCategories[index].str_tenlh = newCategoryName;
    setCategories(updatedCategories);
    setEditingIndex(null);
  };

  const handleDelete = (index: number, str_malh: string) => {
    const updatedCategories = categories.filter((_, catIndex) => catIndex !== index);
    setCategories(updatedCategories);
  };

  const handleAddCategory = () => {
    const newCategory = {
      str_malh: `${categories.length + 1}`, // Unique ID
      str_tenlh: "New Category"
    };
    setCategories([...categories, newCategory]);
  };

  return (
    <div>
      {categories.map((category, index) => (
        <div key={index} className="border p-4 shadow-md flex items-center justify-between">
          {editingIndex === index ? (
            <input
              type="text"
              value={newCategoryName}
              onChange={(e) => setNewCategoryName(e.target.value)}
              className="border p-2 rounded"
            />
          ) : (
            <h2 className="font-bold">{category.str_tenlh}</h2>
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
                  onClick={() => handleEdit(index, category.str_tenlh)} // Trigger edit on click
                >
                  <EditIcon />
                </IconButton>
                <IconButton
                  aria-label="delete"
                  onClick={() => handleDelete(index, category.str_malh)}
                >
                  <DeleteIcon />
                </IconButton>
              </div>
            )}
          </div>
        </div>
      ))}
      <button
        onClick={handleAddCategory}
        className="mt-4 p-2 bg-green-500 text-white rounded"
      >
        Add New Category
      </button>
    </div>
  );
};

export default CategorySection;
