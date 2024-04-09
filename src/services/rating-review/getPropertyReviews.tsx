export default async function getPropertyReviews(propertyId: string) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_HTTP_BACKEND_HOST}/api/v1/ratings/${propertyId}`,
      {
        method: "GET",
        credentials: "include",
      }
    );
    if (!response.ok) {
      throw new Error("Failed to fetch property reviews");
    }
    return await response.json();
  } catch (error) {
    console.error(error);
  }
}
