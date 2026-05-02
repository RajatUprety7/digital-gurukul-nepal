import { NextResponse } from "next/server";
export const ok = (data = {}, status = 200) => NextResponse.json({ success: true, ...data }, { status });
export const fail = (message = "Something went wrong", status = 400) => NextResponse.json({ success: false, message }, { status });
