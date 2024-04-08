import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import isUserLogin from "./services/users/isUserLogin";

export const config = {
  matcher: [
    "/listing",
    "/favorite",
    "/create-property",
    "/edit-profile",
    "/edit-profiles",
    "/editProfile",
    "/my-appointment",
    "/property",
    "/my-agreement"
  ],
};

export function middleware(request: NextRequest) {
  // const res = await isUserLogin();
  
  const res = request.cookies.get('session')
  console.log(res,"middle")
  if (!res) {
    return NextResponse.redirect(new URL("http://localhost:3000/login"));
  }
}
