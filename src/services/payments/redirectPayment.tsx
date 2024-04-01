export const redirectPayment = async () => {
    try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_HTTP_BACKEND_HOST}/api/v2/payments`,
          {
            method: "POST",
            // credentials: "include",
            // body: verification,
          }
        );
        if (!response.ok) {
          throw new Error("Failed to redirect to payment");
        }
        const html = await response.text();
        return html;
      } catch (error) {
        console.error("Error redirecting to payment:", error);
        throw error;
      }
}