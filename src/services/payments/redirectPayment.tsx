export const redirectPayment = async (data:any) => {
    try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_HTTP_BACKEND_HOST}/api/v1/checkout?agreement_id=${data.agreement_id}&name=${data.name}&price=${data.price}&payment_method=${data.payment_method}`,
          {
            method: "GET",
            credentials: "include",
          }
        );
        console.log(`${process.env.NEXT_PUBLIC_HTTP_BACKEND_HOST}/api/v1/checkout?agreement_id=${data.agreement_id}&name=${data.name}&price=${data.price}&payment_method=${data.payment_method}`)
        if (!response.ok) {
          throw new Error("Failed to redirect to payment");
        }
        const res = await response.json();
        return res;
      } catch (error) {
        console.error("Error redirecting to payment:", error);
        throw error;
      }
}