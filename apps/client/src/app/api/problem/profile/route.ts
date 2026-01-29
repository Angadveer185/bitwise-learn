import axiosInstance from "@/lib/axios";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const backendUrl = process.env.BACKEND_URL;

    if (!backendUrl) {
      return NextResponse.json(
        { error: "Backend URL not configured" },
        { status: 500 },
      );
    }
    const response = await axiosInstance.get(
      `${backendUrl}/api/v1/problems/get-user-solved-questions`,
    );

    return NextResponse.json(response.data.data, { status: 200 });
  } catch (error: any) {
    console.log(error);
    return NextResponse.json({ error: error.message });
  }
}
