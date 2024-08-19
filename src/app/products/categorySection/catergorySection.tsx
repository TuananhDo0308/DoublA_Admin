import React, { useState, useEffect } from "react";
import MoreVertIcon from "@mui/icons-material/MoreVert"; // Material-UI Icons
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import SaveIcon from "@mui/icons-material/Save";
import IconButton from "@mui/material/IconButton";
import { addNewCategory, updateCategory, removeCategory, getCategories } from "@/API/productAPI";
// Category Section Component
const CategorySection = ({ categories, setCategories }: { categories: any[], setCategories: any }) => {
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [newCategoryName, setNewCategoryName] = useState<string>("");
  const [showActions, setShowActions] = useState<number | null>(null); // Tracks which row's action menu is open

  // useEffect(() => {
  //   fetchCategories();
  // }, []);
  // // Fetch Categories
  // const fetchCategories = async () => {
  //   try {
  //     const data = await getCategories();
  //     setCategories(data.list);
  //   } catch (error) {
  //     console.error("Error fetching categories:", error);
  //   }
  // }; 

  const handleOpenDetail = (product: any) => {
    setEditingIndex(null); // Exit edit mode
    setShowActions(null);
  };

  const handleEdit = (index: number, currentName: string) => {
    setEditingIndex(index);
    setNewCategoryName(currentName);
    setShowActions(null); // Hide action menu when editing starts
  };

  const handleSave = async (index: number) => {
    let updatedCategories = [...categories];
    let category = updatedCategories[index];

    if (category.str_malh !== "") {
        // Nếu có ID, gọi API để cập nhật
        try {
            console.log("Id Cate update: ", category.str_malh);
            await updateCategory(category.str_malh, newCategoryName);
            alert("Category updated successfully");
        } catch (error) {
            console.error("Failed to update category", error);
        }
    } else {
        // Nếu không có ID, gọi API để thêm mới
        try {
            const response = await addNewCategory(newCategoryName);
            
            // Giả sử API trả về ID mới cho loại hàng, bạn có thể cập nhật lại mảng categories
            updatedCategories[index] = {
                ...category,
                str_malh: response.category.str_malh,
                str_tenlh: response.category.str_tenlh
            };
            alert("Category added successfully");
        } catch (error) {
            console.error("Failed to add new category", error);
        }
    }

    setCategories(updatedCategories);
    setEditingIndex(null);
  };

  const handleDelete = async(index: number, str_malh: string) => {
    try {
      
      await removeCategory(str_malh);
      alert("Delete Successful!!!")

      // Cập nhật lại danh sách categories sau khi xóa thành công
      const updatedCategories = categories.filter((_, catIndex) => catIndex !== index);
      setCategories(updatedCategories);
    } catch (error) {
        console.error("Failed to delete category", error);
    }
  };

  const handleAddCategory = () => {
    const newCategory = {
      str_malh: "", // Unique ID
      str_tenlh: ""
    };
    const updatedCategories = [...categories, newCategory];
    setCategories(updatedCategories);
    setEditingIndex(updatedCategories.length - 1)
    setNewCategoryName("")
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
              autoFocus
              required
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
