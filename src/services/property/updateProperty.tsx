import { PropertyFormData } from "@/models/PropertyData";

export default async function updateProperty(propData: PropertyFormData) {
  const formData = new FormData();

  for (const [key, value] of Object.entries(propData)) {
    // console.log(`${key}, ${value}`);
    // if(key!=="property_id")
    if (key !== "propertyId") formData.append(key, value);
    // if(key==="image_urls"){
    //   formData.append(key,Array<string>(value));
    // }
  }

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_HTTP_BACKEND_HOST}/api/v1/properties/${propData.propertyId}`,
      {
        method: "PATCH",
        credentials: "include",
        body: formData,
      }
    );
    if (!response.ok) {
      throw new Error("Failed to update property");
    }
    return await response.json();
  } catch (error) {
    console.error("Error updateing property details:", error);
    throw new Error("Failed to update property details");
  }
}
