import axiosInstance from "@/lib/axios";
import { NextRequest, NextResponse } from "next/server";

export async function POST(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const body = await req.json();

    const response = await axiosInstance.post(
      `${process.env.BACKEND_URL}/api/v1/courses/add-course-section/${id}`,
      body,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return NextResponse.json(response.data, {
      status: response.status,
    });
  } catch (error: any) {
    console.error("Create section error:", error);

    return NextResponse.json(
      {
        message:
          error.response?.data?.message ||
          error.message || "",
      },
      {
        status: error.response?.status || 500,
      }
    );
  }
}
