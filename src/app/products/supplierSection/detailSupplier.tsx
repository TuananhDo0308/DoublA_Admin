import React from "react";
import { updateSupplier } from "@/API/productAPI";
import { useForm, FormProvider } from "react-hook-form";

export default function DetailSupplier({
  supplier,
  onClose,
  onSave,
}: {
  supplier: any;
  onClose: any;
  onSave: any;
}) {
  const methods = useForm({
    defaultValues: {
      str_tenncc: supplier?.str_tenncc || "",
      strsdt: supplier?.strsdt || "",
      str_dia_chi: supplier?.str_dia_chi || "",
    },
    mode: "onTouched",
  });

  const { handleSubmit } = methods;

  const onSubmit = async (data: any) => {
    try {
      const updatedSupplier = {
        ...supplier,
        ...data,
      };
      const response = await updateSupplier(supplier.str_mancc, data.str_tenncc, data.str_dia_chi,data.strsdt )
      onSave(updatedSupplier);
      onClose(); // Close the modal after saving
    } catch (error) {
      console.error("Failed to update supplier:", error);
      alert("Failed to update supplier. Please try again.");
    }
  };

  return (
    <div className="fixed inset-0 z-50 ml-[290px] flex items-center justify-center bg-black bg-opacity-10">
      <div className="relative w-full max-w-lg rounded-lg bg-white p-6 shadow-lg">
        <h2 className="mb-4 text-3xl font-bold text-blue-800">Edit Supplier</h2>

        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex justify-between">
              {/* Supplier Name Input */}
              <div className="w-full">
                <label className="text-gray-700 mt-4 block text-lg font-bold">
                  Supplier Name
                </label>
                <input
                  className="w-full rounded-lg border-[1.5px] border-primary bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:bg-form-input dark:text-white"
                  type="text"
                  {...methods.register("str_tenncc")}
                />
              </div>

              {/* Phone Number Input */}
              <div>
                <label className="text-gray-700 mt-4 block text-lg font-bold">
                  Phone Number
                </label>
                <input
                  className="w-30 rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  type="text"
                  {...methods.register("strsdt")}
                />
              </div>
            </div>

            {/* Address Input */}
            <div>
              <label className="text-gray-700 mt-2 block text-lg font-bold">
                Address
              </label>
              <input
                className="w-full rounded-lg border-[1.5px] border-primary bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:bg-form-input dark:text-white"
                type="text"
                {...methods.register("str_dia_chi")}
              />
            </div>

            {/* Modal Actions */}
            <div className="mt-6 flex justify-end space-x-2">
              <button
                onClick={onClose}
                className="inline-flex items-center justify-center rounded-full bg-meta-1  px-8 py-4 text-center font-medium text-white hover:bg-opacity-90"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="inline-flex items-center justify-center rounded-full bg-primary  px-8 py-4 text-center font-medium text-white hover:bg-opacity-90"
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
