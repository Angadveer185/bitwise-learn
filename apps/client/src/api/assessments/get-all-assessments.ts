import axiosInstance from "@/lib/axios";

export const getAllAssessments = async ()=>{
    const res = axiosInstance.get("/api/assessments/get-all-assessments");
    return (await res).data;
}