import axiosInstance from "@/lib/axios";

export const getAssessmentsByBatch = async (statefn: any, paramId: string) => {
    const getAssessments = await axiosInstance.get(
        "/api/assessment/get-by-batch/" + paramId,
    );
    statefn(getAssessments.data);
};
