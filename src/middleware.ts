import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import isUserLogin from "./services/users/isUserLogin";
import { useAuthContext } from "./context/AuthContext";

export const config = {
  matcher: [
    "/listing",
    "/favorite",
    "/create-property",
    "/edit-profile",
    "/my-appointment",
    "/property",
    "/my-agreement",
    "/edit-property",
  ],
};

export function middleware(request: NextRequest) {
  // const res = await isUserLogin();
  // const { user } = useAuthContext();
  // console.log(user,"auth")

  const res = request.cookies.get('session')
  console.log(res,"middle")
  if (!res) {
    return NextResponse.redirect(new URL("http://localhost:3000/login"));
  }
}
