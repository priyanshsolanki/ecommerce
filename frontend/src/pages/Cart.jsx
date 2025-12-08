import { useEffect } from "react";
import { cartService } from "../api/cartService";
import { useCart } from "../context/CartContext";
import CartItem from "../components/CartItem";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Cart() {
  const { cart, loadCart } = useCart();
  const { authUser } = useAuth();

  useEffect(() => {
    loadCart(authUser.sub);
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Your Cart</h1>

      {cart.items?.map(item => (
        <CartItem key={item.productId} item={item} />
      ))}

      <h2 className="text-xl font-bold mt-4">Total: ${cart.cartTotal}</h2>

      <Link
        to="/checkout"
        className="mt-6 inline-block bg-green-600 text-white px-6 py-2 rounded"
      >
        Checkout
      </Link>
    </div>
  );
}
