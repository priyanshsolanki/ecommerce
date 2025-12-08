import axiosInstance from "./axiosInstance";

export const productService = {
  list: () => axiosInstance.get("/products/list"),
  details: (productId) => axiosInstance.get(`/products/details?productId=${productId}`),
  search: (q) => axiosInstance.get(`/products/search?query=${q}`),
};
