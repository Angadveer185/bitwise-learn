import axiosInstance from "@/lib/axios";

export const getAllCourses = async () => {
  const res = await axiosInstance.get("/api/course");
  return res.data;
};
