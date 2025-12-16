import axiosInstance from "./axiosInstance";

export const userActivityService = {
  log: (data) => axiosInstance.post(`/user/activity`, data)
};
