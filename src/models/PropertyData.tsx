export default interface PropertyImages {
  created_at: string;
  image_url: string;
}

interface Renting {
  created_at: string;
  is_occupied: boolean;
  price_per_month: number;
}

interface Selling {
  created_at: string;
  is_sold: boolean;
  price: number;
}

export default interface PropertyData {
  address: string;
  alley: string;
  bathrooms: number;
  bedrooms: number;
  country: string;
  created_at: string;
  district: string;
  floor: number;
  floor_size: number;
  floor_size_unit: string;
  furnishing: string;
  property_images: PropertyImages[];
  is_favorite: boolean;
  owner_id: string;
  postal_code: string;
  property_description: string;
  property_id: string;
  property_name: string;
  property_type: string;
  province: string;
  renting_property: Renting;
  selling_property: Selling;
  street: string;
  sub_district: string;
  unit_number: number;
}

export interface PropertyFormData {
  propertyId: string; // Property id
  address: string; // Example: "123/4"
  alley: string; // Example: "Pattaya Nua 78"
  bathrooms: number; // Example: 2
  bedrooms: number; // Example: 3
  country: string; // Example: "Thailand"
  district: string; // Example: "Bang Phli"
  floor: number; // Example: 5
  floor_size: number; // Example: 123.45
  floor_size_unit: string; // Example: "SQM"
  furnishing: string; // Example: "UNFURNISHED"
  image_urls: string[]; // Example: ["https://image_url.com/abcd", "https://image_url.com/abcd", "https://image_url.com/abcd"]
  is_occupied: boolean; // Example: false
  is_sold: boolean; // Example: true
  postal_code: string; // Example: "69096"
  price: number; // Example: 12345.67
  price_per_month: number; // Example: 12345.67
  property_description: string; // Example: "Et sequi dolor praes"
  property_name: string; // Example: "Supalai"
  property_type: string; // Example: "CONDOMINIUM"
  province: string; // Example: "Pattaya"
  street: string; // Example: "Pattaya"
  sub_district: string; // Example: "Bang Bon"
  unit_number: number; // Example: 123
}

