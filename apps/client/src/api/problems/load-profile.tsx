import axiosInstance from "@/lib/axios";
export const loadProfile = async () => {
  const res = await axiosInstance.get("/api/problem/profile");
  return res.data;
};
