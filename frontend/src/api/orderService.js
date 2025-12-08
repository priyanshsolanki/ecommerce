import axiosInstance from "./axiosInstance";

export const orderService = {
  create: (data) => axiosInstance.post("/orders/create", data),
  list: () => axiosInstance.get("/orders/list"),
  listByUser: (userId) => axiosInstance.get(`/orders/user?userId=${userId}`)
};
