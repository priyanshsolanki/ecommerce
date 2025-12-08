import axiosInstance from "./axiosInstance";

export const cartService = {
  add: (data) => axiosInstance.post("/cart/add", data),
  update: (data) => axiosInstance.post("/cart/update", data),
  remove: (data) => axiosInstance.post("/cart/remove", data),
  clear: (data) => axiosInstance.post("/cart/clear", data),
  get: (userId) => axiosInstance.get(`/cart/get?userId=${userId}`),
};
