import axiosInstance from "./axiosInstance";

export const recommendationService = {
  get: () => axiosInstance.get("/recommendations"),
};
