import axiosInstance from "@/lib/axios";

export const submitIndividualQuestion = async (
  id: string,
  data: any,
  type: "CODE" | "NO_CODE",
) => {
  await axiosInstance.post("/api/assessments/submit/question/" + id, data);
};

export const submitTest = async (id: string, data: any) => {
  await axiosInstance.post("/api/assessments/submit/" + id, data);
};
