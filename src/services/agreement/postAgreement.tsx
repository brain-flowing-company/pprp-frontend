import AgreementData from "@/models/AgreementData";

export default async function postAgreement({
  agreementType,
  propertyId,
  dwellerId,
  agreementDate,
  status,
  depositAmt,
  paymentPerMonth,
  paymentDuration,
  totalPayment
} : {
  agreementType: string,
  propertyId: string | undefined,
  dwellerId: string | undefined,
  agreementDate: string,
  status: string,
  depositAmt: number | undefined,
  paymentPerMonth: number | undefined,
  paymentDuration: number | undefined,
  totalPayment: number 
}) {
    // const apptISODate = apptDate.toISOString()
    // console.log(apptISODate)
    try {
      const response = await fetch(
        `http://localhost:8000/api/v1/agreements`, {
            method: 'POST',
            headers: {
              "Content-Type": "application/json"
            },
            credentials: 'include',
            body: JSON.stringify({
              agreement_type: agreementType,
              property_id: propertyId,
              // owner_user_id: ownerId,
              dweller_user_id: dwellerId,
              agreement_date: agreementDate,
              status: status,
              deposit_amount: depositAmt,
              payment_per_month: paymentPerMonth,
              payment_duration: paymentDuration,
              total_payment: totalPayment
            })
        }
      );
      if (!response.ok) {
        throw new Error("Failed to post agreement");
      }
      return await response.json()
    } catch (error) {
      console.log(error);
    }
  }
  