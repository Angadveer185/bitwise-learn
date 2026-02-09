import axiosInstance from "@/lib/axios";
import toast from "react-hot-toast";

export async function changeStatus(problemId: string) {
  try {
    const response = await axiosInstance.post(
      "/api/admin/change-status/" + problemId,
    );
    return response.data;
  } catch (error) {
    toast.error("failed to get change status");
  }
}
export async function deleteStatus(problemId: string) {
  try {
    const response = await axiosInstance.delete(
      "/api/admin/delete-problem/" + problemId,
    );
    return response.data;
  } catch (error) {
    toast.error("failed to get change status");
  }
}
