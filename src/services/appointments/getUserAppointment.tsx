export default async function getUserAppointment() {
    try {
      const response = await fetch(
        `http://localhost:8000/api/v1/user/me/appointments`,
        {
          method: "GET",
          credentials: "include"
        }
      );
      const data = await response.json();
      return data
    } catch (error) {
      console.error("Error fetching appointments:", error);
      throw new Error("Failed to fetch appointments");
    }
  }
  