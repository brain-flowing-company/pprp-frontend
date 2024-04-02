import UserData from "@/models/UserData";

export default async function getUserById(userId: string): Promise<UserData> {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_HTTP_BACKEND_HOST}/api/v1/user/${userId}`,
      {
        method: "GET",
        credentials: "include",
      }
    );
    if (!response.ok) {
      throw new Error("Failed to fetch user information");
    }
    let json = response.json();
    return Promise.resolve(json);
  } catch (error) {
    console.error(error);
    return Promise.reject(error);
  }
}
