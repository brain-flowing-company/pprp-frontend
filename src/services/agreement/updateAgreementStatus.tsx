export default async function UpdateAgreementStatus({
    agreementId, 
    status,
    msg
} : {
    agreementId: string,
    status: string,
    msg: string
}) {
    try {
        const response = await fetch(
            `http://localhost:8000/api/v1/agreements/${agreementId}`, {
                method: 'PATCH',
                headers: {
                    "Content-Type": "application/json"
                },
                credentials: 'include',
                body: JSON.stringify({
                    status: status,
                    cancelled_message: msg
                })
            }
        );
        if (!response.ok) {
            throw new Error("Error updating appointment status");
        }
        return await response.json()
    } catch (error) {
        console.log(error)
    }
}