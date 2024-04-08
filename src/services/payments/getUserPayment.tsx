export default async function getUserPayment() {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_HTTP_BACKEND_HOST}/api/v1/payments`,
        {
          method: "GET",
          credentials: "include",
        }
      );
      if (!response.ok) {
        throw new Error("Failed to fetch user payment");
      }
      return await response.json();
    } catch (error) {
      console.error(error);
    }
  }
  