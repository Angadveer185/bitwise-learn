import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();

        const res = await fetch(
            `${process.env.BACKEND_URL}/api/v1/auth/reset-password`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    cookie: req.headers.get("cookie") ?? "",
                },
                body: JSON.stringify(body),
            }
        );

        const data = await res.json();
        console.log(data);

        return NextResponse.json(data, { status: res.status });
    } catch (error: any) {
        return NextResponse.json(
            { message: error.message },
            { status: 500 }
        );
    }
}
