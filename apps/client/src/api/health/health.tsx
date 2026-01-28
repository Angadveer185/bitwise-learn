import axiosInstance from "@/lib/axios";
export const getHealth = async (stateFn: any) => {
    const data = await axiosInstance.get("/health");
    console.log(data);
    stateFn(data.data);
};
