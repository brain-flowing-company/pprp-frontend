import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { PropertyFormData } from "@/models/PropertyData";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function arePropertiesDifferent(
  property1: PropertyFormData,
  property2: PropertyFormData
): boolean {
  //no data yet
  if(property1.image_urls === undefined && property2.image_urls === undefined){
    return false
  }
  // Check each property for differences
  if (
    property1.address !== property2.address ||
    property1.alley !== property2.alley ||
    property1.bathrooms !== property2.bathrooms ||
    property1.bedrooms !== property2.bedrooms ||
    property1.country !== property2.country ||
    property1.district !== property2.district ||
    property1.floor !== property2.floor ||
    property1.floor_size !== property2.floor_size ||
    property1.floor_size_unit !== property2.floor_size_unit ||
    property1.furnishing !== property2.furnishing ||
    property1.is_occupied !== property2.is_occupied ||
    property1.is_sold !== property2.is_sold ||
    property1.postal_code !== property2.postal_code ||
    property1.price !== property2.price ||
    property1.price_per_month !== property2.price_per_month ||
    property1.property_description !== property2.property_description ||
    property1.property_name !== property2.property_name ||
    property1.property_type !== property2.property_type ||
    property1.province !== property2.province ||
    property1.street !== property2.street ||
    property1.sub_district !== property2.sub_district ||
    property1.unit_number !== property2.unit_number ||
    property1.image_urls.length !== property2.image_urls.length ||
    !property1.image_urls.every(
      (url, index) => url === property2.image_urls[index]
    )
  ) {
    return true; // Properties are different
  }

  // Check if property_images are different
  if (
    (property1.property_images && !property2.property_images) ||
    (!property1.property_images && property2.property_images) ||
    (property1.property_images &&
      property2.property_images &&
      property1.property_images.length !== property2.property_images.length)
  ) {
    return true; // Properties are different
  }

  // Check if property_images are different (by comparing file names)
  if (property1.property_images && property2.property_images) {
    for (let i = 0; i < property1.property_images.length; i++) {
      if (
        property1.property_images[i][0].name !== property2.property_images[i][0].name
      ) {
        return true; // Properties are different
      }
    }
  }

  return false; // Properties are the same
}


