import { useState, useEffect } from "react";
import { adminService } from "../api/adminService";

export default function ProductModal({ open, onClose, product, refresh }) {
  const [form, setForm] = useState({});

  useEffect(() => {
    if (product) {
      setForm({
        name: product.name,
        price: product.price,
        qty: product.qty,
        category: product.category,
        description: product.description,
        imageUrl: product.imageUrl,
      });
    }
  }, [product]);

  if (!open) return null;

  const handleUpdate = async () => {
    if(product.productId == undefined || product.productId == null){
      await adminService.add({
        ...form,
        price: Number(form.price),
        qty: Number(form.qty)
      });
    }
    else
    {
      await adminService.update({
        productId: product.productId,
        ...form,
        price: Number(form.price),
        qty: Number(form.qty)
      });
    }
    refresh();
    onClose();
  };

  const handleDelete = async () => {
    await adminService.delete({
      productId: product.productId
    });
    refresh();
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white p-8 rounded-lg w-[500px] shadow-xl">
        <h2 className="text-2xl font-bold mb-4">Edit Product</h2>

        <div className="flex flex-col gap-3">
          {Object.keys(form).map((key) => (
            <input
              key={key}
              className="border p-2 rounded"
              placeholder={key}
              value={form[key]}
              onChange={(e) => setForm({ ...form, [key]: e.target.value })}
            />
          ))}
        </div>

        <div className="flex justify-between mt-6">
          <button
            className="bg-green-600 text-white px-4 py-2 rounded"
            onClick={handleUpdate}
          >
            Save Changes
          </button>

          <button
            className="bg-red-600 text-white px-4 py-2 rounded"
            onClick={handleDelete}
          >
            Delete
          </button>

          <button
            className="bg-gray-400 text-white px-4 py-2 rounded"
            onClick={onClose}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
