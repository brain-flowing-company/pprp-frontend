interface image {
    image_url: string;
}

interface property {
    property_id: string;
    property_name: string;
    property_type: string;
    property_images: image[];
    address: string;
    alley: string;
    street: string;
    sub_district: string;
    district: string;
    province: string;
    country: string;
    postal_code: string;
    price: string;
    price_per_month: string;
}

interface owner {
    owner_user_id: string;
    owner_first_name: string;
    owner_last_name: string;
    owner_profile_image_url: string;
    owner_phone_number: string;
}

interface dweller {
    dweller_user_id: string;
    dweller_first_name: string;
    dweller_last_name: string;
    dweller_profile_image_url: string;
    dweller_phone_number: string;
}

export default interface AgreementData {
    agreement_id: string;
    agreement_type: string; // RENTING, SELLING
    property: property;
    owner: owner;
    dweller: dweller;
    agreement_date: string;
    status: string;
    deposit_amount: number;
    payment_per_month: number;
    total_payment: number;
    payment_duration: number;
    cancelled_message: string;
}