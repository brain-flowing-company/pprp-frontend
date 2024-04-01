export default async function getUserProperties() {
    try {
      const response = await fetch(
        `http://localhost:8000/api/v1/user/me/properties`,
  
        {
          method: "GET",
          credentials: "include",
        }
      );
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching property details:", error);
      throw new Error("Failed to fetch property details");
    }
  }
  