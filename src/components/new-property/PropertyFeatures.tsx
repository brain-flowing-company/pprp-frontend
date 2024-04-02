import PropertyData from "@/models/PropertyData";
import Image from "next/image";

export default function PropertyFeatures({
  property,
}: {
  property: PropertyData;
}) {
  return (
    <div className="flex flex-row justify-around gap-x-6 px-2 text-sm sm:text-lg">
      <div className="flex flex-row items-center gap-x-2">
        <Image
          src="/img/home-page/bed.svg"
          alt="heart"
          width={40}
          height={40}
        />
        <div>{property.bedrooms} Bedrooms</div>
      </div>
      <div className="flex flex-row items-center gap-x-2">
        <Image
          src="/img/property/bathroom.svg"
          alt="heart"
          width={40}
          height={40}
        />
        <div>{property.bathrooms} Bathrooms</div>
      </div>
      <div className="flex flex-row items-center gap-x-2">
        <Image
          src="/img/property/floor.svg"
          alt="heart"
          width={40}
          height={40}
        />
        <div>{property.floor} Floor</div>
      </div>
      <div className="flex flex-row items-center gap-x-2">
        <Image
          src="/img/home-page/area.svg"
          alt="heart"
          width={40}
          height={40}
        />
        <div>{property.floor_size} m²</div>
      </div>
    </div>
  );
}
