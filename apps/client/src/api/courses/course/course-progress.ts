import axiosInstance from "@/lib/axios";

export const markAsDone = async (id: string) => {
  const res = await axiosInstance.post("/api/course/change-status/" + id, {
    currentStatus: "DONE",
  });

  return res.data;
};
export const markAsUnDone = async (id: string) => {
  const res = await axiosInstance.post("/api/course/change-status/" + id, {
    currentStatus: "UN_DONE",
  });

  return res.data;
};
