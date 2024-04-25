export default async function deleteReview(ratingId: string) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_HTTP_BACKEND_HOST}/api/v1/ratings/${ratingId}`,
      {
        method: "DELETE",
        credentials: "include",
      }
    );
    if (!response.ok) {
      throw new Error("Failed to delete review");
    }
    const res = await response.json();
    return res;
  } catch (error) {
    console.error("Error deleting review:", error);
    throw error;
  }
}
