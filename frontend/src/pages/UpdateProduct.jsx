import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { productService } from "../api/productService";
import { cartService } from "../api/cartService";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";

export default function ProductDetails() {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [qty, setQty] = useState(1);

  const { authUser } = useAuth();
  const { loadCart } = useCart();

  useEffect(() => {
    productService.details(productId).then((res) => setProduct(res.data));
  }, [productId]);

  const addToCart = async () => {
    await cartService.add({
      userId: authUser.sub,
      productId,
      quantity: qty,
    });

    await loadCart(authUser.sub);
    alert("Added to cart!");
  };

  if (!product) return <p className="p-10 text-lg">Loading...</p>;

  return (
    <div className="p-10 max-w-4xl mx-auto">
      <div className="grid grid-cols-2 gap-10">

        {/* LEFT: Product Image */}
        <div>
          <img
            src={product.imageUrl}
            alt={product.name}
            className="rounded-lg shadow-lg w-full h-[400px] object-cover"
          />
        </div>

        {/* RIGHT: Product Info */}
        <div className="flex flex-col gap-4">
          <h1 className="text-4xl font-bold">{product.name}</h1>
          <p className="text-gray-600 text-lg">{product.category}</p>

          <p className="text-green-700 text-3xl font-bold">
            ${product.price}
          </p>

          <p className="text-gray-700">{product.description}</p>

          <p className="font-semibold text-gray-700">
            In Stock: {product.qty}
          </p>

          {/* Quantity Selector */}
          <div className="flex items-center gap-3 mt-4">
            <button
              onClick={() => qty > 1 && setQty(qty - 1)}
              className="bg-gray-200 px-3 py-1 rounded"
            >
              −
            </button>

            <span className="text-xl font-semibold w-6 text-center">
              {qty}
            </span>

            <button
              onClick={() => setQty(qty + 1)}
              className="bg-gray-200 px-3 py-1 rounded"
            >
              +
            </button>
          </div>

          {/* Add to Cart Button */}
          <button
            onClick={addToCart}
            className="mt-6 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg text-lg shadow"
          >
            Add to Cart
          </button>

          {/* Back Link */}
          <button
            onClick={() => window.history.back()}
            className="mt-2 underline text-gray-600"
          >
            Go Back
          </button>
        </div>
      </div>
    </div>
  );
}
