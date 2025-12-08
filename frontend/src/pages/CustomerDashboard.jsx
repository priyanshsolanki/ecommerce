import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import { useAuth } from "../context/AuthContext";
import { productService } from "../api/productService";
import ProductCard from "../components/ProductCard";
import Home from "./Home";
export const CustomerDashboard = (props) => {
  const { authUser } = useAuth();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    productService.list().then(res => setProducts(res.data));
  }, []);
  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      
      <div className="flex-1 pt-20 lg:pt-0 flex flex-col relative">
        {/* Header */}
        <div className="bg-white shadow-sm border-b border-gray-200 z-10">
          {/* <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Welcome back, {authUser.name}! 🛴
              </h1>
              <p className="text-gray-600 mt-1">Find and ride available scooters nearby</p> */}
              {<props.component/>}
            {/* </div>
            
          </div> */}
        </div>
      </div>
    </div>
  );
};