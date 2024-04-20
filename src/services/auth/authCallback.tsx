export default async function authCallback(query: string) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_HTTP_BACKEND_HOST}/api/v1/auth/callback?${query}`,
      {
        method: "GET",
        credentials: "include",
      }
    );
    if (!response.ok) {
      throw new Error("Failed to validate user information");
    }
    return await response.json();
  } catch (err) {
    console.log(err);
    return { registered_type: "EMAIL" };
    // return err;
  }
}
