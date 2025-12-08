import { useEffect, useState } from "react";
import { productService } from "../api/productService";
import { cartService } from "../api/cartService";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [sortBy, setSortBy] = useState("default");
  const [openCart, setOpenCart] = useState(false);
  const { authUser } = useAuth();
  const { cart, loadCart } = useCart();

  useEffect(() => {
    productService.list().then((res) => setProducts(res.data));
    loadCart(authUser.sub);
  }, []);

  const categories = [...new Set(products.map((p) => p.category))];

  const filtered = products.filter((p) => {
    const matchName = p.name.toLowerCase().includes(search.toLowerCase());
    const matchCat = category === "" || p.category === category;
    return matchName && matchCat;
  });

  // Apply sorting
  const sorted = [...filtered].sort((a, b) => {
    switch (sortBy) {
      case "price-low":
        return a.price - b.price;
      case "price-high":
        return b.price - a.price;
      case "name-asc":
        return a.name.localeCompare(b.name);
      case "name-desc":
        return b.name.localeCompare(a.name);
      default:
        return 0;
    }
  });

  const addToCart = async (productId) => {
    await cartService.add({
      userId: authUser.sub,
      productId,
      quantity: 1,
    });

    await loadCart(authUser.sub);
  };

  const removeFromCart = async (productId) => {
    await cartService.remove({
      userId: authUser.sub,
      productId,
    });

    await loadCart(authUser.sub);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header Bar */}
      <div className="bg-white shadow-sm border-b sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between gap-4">
           
            
            <div className="flex-1 max-w-2xl">
              <div className="relative">
                <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <input
                  className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                  placeholder="Search for products..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
            </div>

            <select
              className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white cursor-pointer text-sm font-medium text-gray-700"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="">All Categories</option>
              {categories.map((c) => (
                <option key={c}>{c}</option>
              ))}
            </select>
            <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4h13M3 8h9m-9 4h6m4 0l4-4m0 0l4 4m-4-4v12" />
            </svg>
            <select
              className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white cursor-pointer text-sm font-medium text-gray-700"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="default">Default Sort</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="name-asc">Name: A to Z</option>
              <option value="name-desc">Name: Z to A</option>
            </select>
            <button
              onClick={() => setOpenCart(true)}
              className="relative bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-6 py-2.5 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 font-medium flex items-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              <span>Cart</span>
              {cart.items?.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center">
                  {cart.items.length}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Results Info & Sort */}
        <div className="mb-6 flex items-center justify-between">
          <p className="text-gray-600">
            Showing <span className="font-semibold text-gray-900">{sorted.length}</span> products
            {category && <span> in <span className="font-semibold text-blue-600">{category}</span></span>}
          </p>

          
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {sorted.map((p) => (
            <div
              key={p.productId}
              className="group bg-white rounded-2xl shadow-sm hover:shadow-2xl transition-all duration-300 overflow-hidden flex flex-col"
            >
              <a href={`/product/${p.productId}`} className="relative overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 rounded-t-2xl">
                {p.imageUrl ? (
                  <img
                    src={p.imageUrl}
                    alt={p.name}
                    className="h-56 w-full object-cover group-hover:scale-110 transition-transform duration-500"
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.nextSibling.style.display = 'flex';
                    }}
                  />
                ) : null}
                <div className={`h-56 w-full ${p.imageUrl ? 'hidden' : 'flex'} flex-col items-center justify-center`}>
                  <svg className="w-20 h-20 text-gray-300 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <p className="text-gray-400 text-sm">No image</p>
                </div>
                <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-semibold text-gray-700">
                  {p.category}
                </div>
              </a>

              <div className="p-5 flex flex-col flex-1">
                <a href={`/product/${p.productId}`}>
                  <h3 className="text-lg font-semibold text-gray-900 mb-1 hover:text-blue-600 transition line-clamp-2">
                    {p.name}
                  </h3>
                </a>
                
                <div className="mt-auto pt-4">
                  <div className="flex items-center justify-between mb-3">
                    <p className="text-2xl font-bold text-gray-900">${p.price}</p>
                  </div>

                  <button
                    onClick={() => addToCart(p.productId)}
                    className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white py-2.5 rounded-xl font-medium transition-all duration-200 shadow-md hover:shadow-lg"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {sorted.length === 0 && (
          <div className="text-center py-20">
            <svg className="w-20 h-20 mx-auto text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p className="text-xl text-gray-500">No products found</p>
            <p className="text-gray-400 mt-2">Try adjusting your search or filters</p>
          </div>
        )}
      </div>

      {/* Cart Drawer */}
      {openCart && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex justify-end">
          <div className="w-full max-w-md bg-white h-full shadow-2xl flex flex-col">
            {/* Cart Header */}
            <div className="p-6 border-b bg-gradient-to-r from-blue-600 to-blue-700 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold">Shopping Cart</h2>
                  <p className="text-blue-100 text-sm mt-1">
                    {cart.items?.length || 0} {cart.items?.length === 1 ? 'item' : 'items'}
                  </p>
                </div>
                <button
                  onClick={() => setOpenCart(false)}
                  className="bg-white/20 hover:bg-white/30 p-2 rounded-lg transition"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto p-6">
              {cart.items?.length === 0 ? (
                <div className="text-center py-20">
                  <svg className="w-24 h-24 mx-auto text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                  </svg>
                  <p className="text-gray-500 text-lg">Your cart is empty</p>
                  <button
                    onClick={() => setOpenCart(false)}
                    className="mt-4 text-blue-600 hover:text-blue-700 font-medium"
                  >
                    Continue Shopping
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  {cart.items?.map((item) => (
                    <div
                      key={item.productId}
                      className="bg-gray-50 rounded-xl p-4 hover:bg-gray-100 transition"
                    >
                      <div className="flex gap-4">
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-900 mb-1">{item.name}</h3>
                          <p className="text-sm text-gray-600 mb-3">
                            ${item.unitPrice} each
                          </p>

                          {/* Quantity Controls */}
                          <div className="flex items-center gap-3">
                            <button
                              className="bg-white hover:bg-gray-200 border border-gray-300 w-8 h-8 rounded-lg flex items-center justify-center font-semibold transition"
                              onClick={async () => {
                                const newQty = item.qty - 1;
                                if (newQty <= 0) {
                                  await cartService.remove({
                                    userId: authUser.sub,
                                    productId: item.productId,
                                  });
                                } else {
                                  await cartService.update({
                                    userId: authUser.sub,
                                    productId: item.productId,
                                    quantity: newQty,
                                  });
                                }
                                await loadCart(authUser.sub);
                              }}
                            >
                              -
                            </button>

                            <span className="font-semibold text-gray-900 w-8 text-center">
                              {item.qty}
                            </span>

                            <button
                              className="bg-white hover:bg-gray-200 border border-gray-300 w-8 h-8 rounded-lg flex items-center justify-center font-semibold transition"
                              onClick={async () => {
                                const newQty = item.qty + 1;
                                await cartService.update({
                                  userId: authUser.sub,
                                  productId: item.productId,
                                  quantity: newQty,
                                });
                                await loadCart(authUser.sub);
                              }}
                            >
                              +
                            </button>
                          </div>
                        </div>

                        <div className="flex flex-col items-end justify-between">
                          <p className="text-lg font-bold text-gray-900">
                            ${item.subtotal}
                          </p>

                          <button
                            onClick={async () => {
                              await cartService.remove({
                                userId: authUser.sub,
                                productId: item.productId,
                              });
                              await loadCart(authUser.sub);
                            }}
                            className="text-red-600 hover:text-red-700 text-sm font-medium flex items-center gap-1"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Cart Footer */}
            {cart.items?.length > 0 && (
              <div className="border-t bg-gray-50 p-6 space-y-4">
                <div className="flex items-center justify-between text-sm">
                  <button
                    onClick={async () => {
                      await cartService.clear({ userId: authUser.sub });
                      await loadCart(authUser.sub);
                    }}
                    className="text-red-600 hover:text-red-700 font-medium"
                  >
                    Clear Cart
                  </button>
                </div>

                <div className="flex items-center justify-between pt-4 border-t">
                  <span className="text-lg font-semibold text-gray-700">Total:</span>
                  <span className="text-3xl font-bold text-gray-900">
                    ${cart.cartTotal}
                  </span>
                </div>

                <button
                  onClick={() => (window.location.href = "/checkout")}
                  className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white px-6 py-4 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-200"
                >
                  Proceed to Checkout
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}