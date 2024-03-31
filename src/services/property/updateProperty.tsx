import PropertyData from "@/models/PropertyData"

export default async function updateProperty(propData) {

  const formData = new FormData();

  for (const [key, value] of Object.entries(propData)) {
    console.log(`${key}: ${value}`);
    // if(key!=="property_id") 
    formData.append(key,value);
  }

//   formData.append("alley","");
//   formData.append("street", "");
//   formData.append("sub_district", "");
//   formData.append("district", "");
//   formData.append("province", "");
//   formData.append("country","");
//   formData.append("postal_code","");


  console.log("test form data")
  formData.entries().forEach((value) => {
    console.log(value);
  });

  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_HTTP_BACKEND_HOST}/api/v1/properties/${propData.property_id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: formData,
    });
    if (!response.ok) {
      throw new Error("Failed to update property");
    }
    return await response.json();
  } catch (error) {
    console.error("Error updateing property details:", error);
    throw new Error("Failed to update property details");
  }
}
