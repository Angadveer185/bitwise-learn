import axiosInstance from "@/lib/axios";

export const getVendorData = async (statefn: any, paramId: string) => {
    try {
        const getVendor = await axiosInstance.get("/api/vendor/" + paramId);
        console.log(getVendor.data);
        statefn(getVendor.data);
    } catch (error) {
        console.log("ERROR", error);
    }
};

