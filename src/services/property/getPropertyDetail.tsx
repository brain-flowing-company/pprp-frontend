export default async function getPropertyDetail(propertyId: string) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_HTTP_BACKEND_HOST}/api/v1/properties/${propertyId}`,
      {
        method: "GET",
        credentials: "include",
      }
    );
    const data = await response.json();
    console.log;
    return data;
  } catch (error) {
    console.error("Error fetching property details:", error);
    throw new Error("Failed to fetch property details");
  }
}
