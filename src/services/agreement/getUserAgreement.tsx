export default async function getUserAgreement() {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_HTTP_BACKEND_HOST}/api/v1/user/me/agreements`,
      {
        method: "GET",
        credentials: "include",
      }
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching agreements:", error);
    // throw new Error("Failed to fetch agreements");
  }
}
