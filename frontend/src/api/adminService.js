import axiosInstance from "./axiosInstance";

export const adminService = {
  add: (data) => axiosInstance.post("/admin/add", data),
  update: (data) => axiosInstance.post("/admin/update", data),
  delete: (data) => axiosInstance.post("/admin/delete", data),
};
