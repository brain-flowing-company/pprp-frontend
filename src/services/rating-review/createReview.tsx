export default async function createReview(
  rating: number,
  review: string,
  propertyId: string
) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_HTTP_BACKEND_HOST}/api/v1/ratings`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          rating: rating,
          review: review,
          property_id: propertyId,
        }),
      }
    );
    if (!response.ok) {
      throw new Error("Failed to create new review");
    }
    console.log(rating, review, propertyId);
    const res = await response.json();
    return res;
  } catch (error) {
    console.error("Error creating new review:", error);
    throw error;
  }
}
