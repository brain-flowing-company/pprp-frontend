export default async function getUserAgreement(sortBy: string) {
  try {
    const response = await fetch(
      `http://localhost:8000/api/v1/user/me/agreements?order=${sortBy}`,
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
