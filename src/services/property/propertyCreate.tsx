import { PropertyInfo } from "@/app/(have-nav)/create-property/page";

export default async function propertyCreate(propertyInfo: PropertyInfo) {
  console.log("propertyInfo:", propertyInfo);

  const formData = new FormData();

  // property_name:Property Name
  // property_description:description description
  // property_type:CONDOMINIUM
  // address:123 address
  // alley:alley
  // street:street
  // sub_district:sub_district
  // district:district
  // province:province
  // country:country
  // postal_code:99999
  // bedrooms:9
  // bathrooms:9
  // furnishing:FULLY_FURNISHED
  // floor:99
  // floor_size:9999.99
  // floor_size_unit:SQFT
  // unit_number:9009
  // price:17500000
  // is_sold:false
  // price_per_month:123
  // is_occupied:false
  // property_images:[]

  console.log(propertyInfo.images);
  propertyInfo.images.forEach((image, index) => {
    console.log(image);
    const blob = new Blob([image], { type: "image/jpeg" });
    formData.append("property_images", blob, image.name);
  });

  /*
  propertyInfo = {
    name: "Property Name",
    description: "descriptiondescription",
    propertyType: "CONDOMINIUM",
    address: "123 address",
    alley: "alley",
    street: "street",
    sub_district: "sub_district",
    district: "district",
    province: "province",
    country: "country",
    postal_code: "99999",
    bedrooms: "9",
    bathrooms: "9",
    furnishing: "FULLY_FURNISHED",
    floor: "99",
    floor_size: "9999.99",
    floor_size_unit: "SQFT",
    unit_number: "9009",
    price: "17500000",
    is_sold: "false",
    price_per_month: "123",
    is_occupied: "false",
    // property_images: ["https://fastly.picsum.photos/id/46/300/200.jpg"],
    // property_images: ["https://picsum.photos/id/45/300/200"],
    // property_images: [
      //   "https://picsum.photos/id/45/300/200",
      //   "https://picsum.photos/id/46/300/200",
    // ],
    // property_images: [
      //   "https://picsum.photos/id/45/300/200.jpg",
      //   "https://picsum.photos/id/46/300/200.jpg",
      // ],
    };
    */

  formData.append("property_name", propertyInfo.name);
  formData.append("property_description", propertyInfo.description);
  formData.append(
    "property_type",
    propertyInfo.propertyType.replaceAll(" ", "_").toUpperCase()
  );
  formData.append("address", propertyInfo.address);

  formData.append("alley", propertyInfo.alley);
  formData.append("street", propertyInfo.street);
  formData.append("sub_district", propertyInfo.sub_district);
  formData.append("district", propertyInfo.district);
  formData.append("province", propertyInfo.province);
  formData.append("country", propertyInfo.country);
  formData.append("postal_code", propertyInfo.postal_code);

  formData.append("bedrooms", propertyInfo.bedrooms);
  formData.append("bathrooms", propertyInfo.bathrooms);
  formData.append(
    "furnishing",
    propertyInfo.furnishing.replaceAll("-", "_").toUpperCase()
  );
  formData.append("floor", propertyInfo.floor);
  formData.append("floor_size", propertyInfo.floorSize);
  formData.append("floor_size_unit", propertyInfo.floorSizeUnit);
  // formData.append("floor_size_unit", "SQFT");
  formData.append("unit_number", propertyInfo.unitNumber);

  formData.append("price", propertyInfo.salePrice);
  formData.append("price_per_month", propertyInfo.rentPrice);

  formData.append("is_sold", propertyInfo.is_sold);
  formData.append("is_occupied", propertyInfo.is_occupied);

  // formData.append("property_images", propertyInfo.property_images);

  // propertyInfo.property_images.forEach((image, index) => {
  //   formData.append(`property_image_${index}`, image);
  // });

  console.log("formData:");
  formData.entries().forEach((value) => {
    console.log(value);
  });

  const response = await fetch(`${process.env.NEXT_PUBLIC_HTTP_BACKEND_HOST}/api/v1/properties`, {
    method: "POST",
    credentials: "include",
    body: formData,
  });
  if (!response.ok) {
    throw new Error("Failed to fetch create property");
  }
  return await response.json();
}

// import { PropertyInfo } from "@/app/(have-nav)/create-property/page";

// export default async function propertyCreate(propertyInfo: PropertyInfo) {
//   const requestBody = {
//     address: "123/4",
//     alley: "Pattaya Nua 78",
//     bathrooms: 2,
//     bedrooms: 3,
//     country: "Thailand",
//     created_at: "string",
//     district: "Bang Phli",
//     floor: 5,
//     floor_size: 123.45,
//     floor_size_unit: "SQM",
//     furnishing: "UNFURNISHED",
//     images: [
//       {
//         created_at: "string",
//         url: "https://picsum.photos/id/45/300/200",
//       },
//     ],
//     is_favorite: true,
//     owner_id: "123e4567-e89b-12d3-a456-426614174000",
//     postal_code: "69096",
//     property_description: "Et sequi dolor praes",
//     property_id: "123e4567-e89b-12d3-a456-426614174000",
//     property_name: "Supalai",
//     property_type: "CONDOMINIUM",
//     province: "Pattaya",
//     renting: {
//       created_at: "string",
//       is_occupied: true,
//       price_per_month: 12345.67,
//     },
//     selling: {
//       created_at: "string",
//       is_sold: true,
//       price: 12345.67,
//     },
//     street: "Pattaya",
//     sub_district: "Bang Bon",
//     unit_number: 123,
//   };

//   try {
//     const response = await fetch("http://localhost:8000/api/v1/properties", {
//       method: "POST",
//       credentials: "include",
//       headers: {
//         "Content-Type": "application/json", // Set content type to JSON
//       },
//       body: JSON.stringify(requestBody), // Convert object to JSON string
//     });
//     return await response.json();
//   } catch (error) {
//     console.log("HELLOO");
//     console.error("Error fetching properties:", error);
//     throw new Error("Failed to fetch properties");
//   }
// }
