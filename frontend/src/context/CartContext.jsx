import { createContext, useContext, useState } from "react";
import { cartService } from "../api/cartService";

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState({ items: [], cartTotal: 0 });

  const loadCart = async (userId) => {
    const res = await cartService.get(userId);
    setCart(res.data);
  };

  return (
    <CartContext.Provider value={{ cart, loadCart }}>
      {children}
    </CartContext.Provider>
  );
};
