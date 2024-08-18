import React, { useState } from "react";

// Category Section Component
const CategorySection = ({ categories, setCategories }: { categories: any[], setCategories: any }) => {
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [newCategoryName, setNewCategoryName] = useState<string>("");

  const handleEdit = (index: number, currentName: string) => {
    setEditingIndex(index);
    setNewCategoryName(currentName);
  };

  const handleSave = (index: number) => {
    const updatedCategories = [...categories];
    updatedCategories[index].str_tenlh = newCategoryName;
    setCategories(updatedCategories);
    setEditingIndex(null);
  };

  const handleDelete = (index: number) => {
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
                onClick={() => handleEdit(index, category.str_tenlh)}
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
        onClick={handleAddCategory}
        className="mt-4 p-2 bg-green-500 text-white rounded"
      >
        Add New Category
      </button>
    </div>
  );
};

export default CategorySection;
