import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
    const token = request.cookies.get("accessToken")?.value;

    const protectedPaths = ["/chat", "/dashboard"];

    if (protectedPaths.some((path) => request.nextUrl.pathname.startsWith(path))) {
    if (!token) {
        return NextResponse.redirect(new URL("/auth/login", request.url));
    }
    }

    return NextResponse.next();
}
