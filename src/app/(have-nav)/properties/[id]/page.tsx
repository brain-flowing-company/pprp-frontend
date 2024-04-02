"use client";

import ImagesSlider from "@/components/new-property/ImagesSlider";
import PropertyDetail from "@/components/new-property/PropertyDetail";
import RelatedProperty from "@/components/new-property/RelatedProperty";
import PropertyData from "@/models/PropertyData";
import UserData from "@/models/UserData";
import getPropertyDetail from "@/services/property/getPropertyDetail";
import getCurrentUser from "@/services/users/getCurrentUser";
import { useEffect, useState } from "react";

export default function PropertyPage({ params }: { params: { id: string } }) {
  const [property, setProperty] = useState<PropertyData>();
  const [user, setUser] = useState<UserData | undefined>();

  useEffect(() => {
    async function getUser() {
      try {
        const data = await getCurrentUser();

        setUser(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    getUser();
  }, []);

  useEffect(() => {
    async function getProperty() {
      try {
        const property = await getPropertyDetail(params.id);
        setProperty(property);
        console.log(property);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    getProperty();
  }, []);

  return (
    <div>
      {property ? (
        <div className="flex flex-col items-center justify-center gap-y-10">
          <ImagesSlider
            imageList={property.property_images}
            width={1920}
            height={500}
            loop={true}
            autoPlay={true}
            autoPlayInterval={3000}
            showArrowControls={true}
            showDotControls={true}
            bgColor="none"
          />
          <PropertyDetail property={property} user={user} />
          <RelatedProperty street={property.street} />
        </div>
      ) : null}
    </div>
  );
}
