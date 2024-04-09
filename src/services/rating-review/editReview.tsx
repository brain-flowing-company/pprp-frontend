export default async function editReview(
  rating: number,
  review: string,
  ratingId: string
) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_HTTP_BACKEND_HOST}/api/v1/ratings/${ratingId}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          rating: rating,
          review: review,
        }),
      }
    );
    if (!response.ok) {
      throw new Error("Failed to update review");
    }
    const res = await response.json();
    return res;
  } catch (error) {
    console.error("Error updating review:", error);
    throw error;
  }
}
