export default async function getProperties(
  query: string,
  limit: number,
  page: number,
  sort: string,
  filter: string
) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_HTTP_BACKEND_HOST}/api/v1/properties?query=${query}&limit=${limit}&page=${page}&sort=${sort}&filter=${filter}`,

      {
        method: "GET",
        credentials: "include",
      }
    );
    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.error("Error fetching properties:", error);
    throw new Error("Failed to fetch properties");
  }
}
