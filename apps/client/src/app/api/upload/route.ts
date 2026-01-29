import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const token = req.headers.get("authorization");
    const formData = await req.formData();
    console.log("route hit");
    const res = await fetch(
      `${process.env.BACKEND_URL}/api/v1/bulk-upload/cloud-info/`,
      {
        method: "POST",
        headers: {
          Authorization: token || "",
        },
        body: formData,
      },
    );
    console.log("output recived");
    const data = await res.json();
    return NextResponse.json(data);
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
