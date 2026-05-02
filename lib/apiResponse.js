import { NextResponse } from "next/server";

export function ok(data = {}, status = 200) {
  return NextResponse.json({ success: true, ...data }, { status });
}

export function fail(message = "Something went wrong", status = 400) {
  return NextResponse.json({ success: false, message }, { status });
}
