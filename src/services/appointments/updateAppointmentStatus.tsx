export default async function UpdateAppointmentStatus({
  appointmentId,
  status,
  msg,
}: {
  appointmentId: string;
  status: string;
  msg: string;
}) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_HTTP_BACKEND_HOST}/api/v1/appointments/${appointmentId}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          status: status,
          cancelled_message: msg,
        }),
      }
    );
    if (!response.ok) {
      throw new Error("Error updating appointment status");
    }
    return await response.json();
  } catch (error) {
    console.log(error);
  }
}
