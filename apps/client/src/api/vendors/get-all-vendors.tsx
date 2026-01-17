import axiosInstance from "@/lib/axios";

export const getAllVendors = async (stateFn: any) => {
  const data = await axiosInstance.get("/api/vendor/");
  console.log("Vendors" + JSON.stringify(data.data));
  stateFn(data.data);
};
