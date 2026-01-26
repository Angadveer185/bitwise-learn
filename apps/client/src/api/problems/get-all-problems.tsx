import axiosInstance from "@/lib/axios";

export const getAllProblemData = async (
  statefn: any,
  admin: boolean = false,
) => {
  const getProblem = await axiosInstance.get(
    "/api/get-problem" + (admin ? "?q=valid" : ""),
  );
  console.log("question data is : " + JSON.stringify(getProblem.data));
  statefn(getProblem.data);
};
