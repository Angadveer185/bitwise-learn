import axiosInstance from "@/lib/axios";

export const uploadBatches = async (
  id: string,
  file: File,
  type: "STUDENT" | "BATCH" | "TESTCASE" | "CLOUD",
  stateFn?: any,
) => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("type", type);
  const res = await axiosInstance.post(`/api/upload/${id}`, formData);

  if (stateFn) {
    stateFn(res.data);
  }

  return res.data;
};
