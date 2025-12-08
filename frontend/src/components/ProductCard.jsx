import { Link } from "react-router-dom";

export default function ProductCard({ p }) {
  return (
    <div className="border rounded p-4 shadow hover:shadow-lg transition">
      <img src={p.imageUrl} alt={p.name} className="h-40 w-full object-cover rounded" />
      <h3 className="text-lg font-bold mt-2">{p.name}</h3>
      <p className="text-gray-600">{p.category}</p>
      <p className="text-green-600 font-semibold">${p.price}</p>

      <Link
        to={`/product/${p.productId}`}
        className="mt-3 inline-block bg-blue-600 text-white px-4 py-2 rounded"
      >
        View
      </Link>
    </div>
  );
}
