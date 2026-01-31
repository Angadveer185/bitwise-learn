import axiosInstance from "@/lib/axios";

export const getAllCourses = async (publishedOnly: boolean = false) => {
  const res = await axiosInstance.get(
    "/api/course" + (publishedOnly ? "?status=published" : ""),
  );
  return res.data;
};


export const getStudentCourses = async ()=>{
  const res = await axiosInstance.get(
    "/api/course/get-student-courses",
  );
  return res.data;
}