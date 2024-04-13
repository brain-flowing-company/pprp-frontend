export default async function isUserLogin() {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_HTTP_BACKEND_HOST}/api/v1/user/me/personal-information`,
      {
        method: "GET",
        credentials: "include",
      }
    );
    console.log(response.ok, "isLo?");
    if (!response.ok) {
      throw false;
    }
    return true;
  } catch (error) {
    console.error(error, "lo");
    return false;
  }
}
