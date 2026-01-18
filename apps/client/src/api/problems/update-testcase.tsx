import axiosInstance from "@/lib/axios";

export const updateProblemTestcase = async (id: string, data: any) => {
  const res = await axiosInstance.post(
    "/api/admin/update-testcase/" + id,
    data,
  );
  console.log(data.data);
};
