import { PropertyFormData } from "@/models/PropertyData";

export default async function updateProperty(propData: PropertyFormData) {
  console.log(propData);
  const formData = new FormData();

  for (const [key, value] of Object.entries(propData)) {
    if (key !== "propertyId") {
      if (key === "image_urls") {
        propData.image_urls.forEach((url, index) => {
          formData.append("image_urls", url);
        });
      } else {
        formData.append(key, value);
      }
    }
  }

  if (propData.property_images !== undefined) {
    console.log("have new img");
    propData.property_images.forEach((image, index) => {
      console.log(image);
      const blob = new Blob([image[0]], { type: image[0].type });
      formData.append("property_images", blob, image[0].name);
    });
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
