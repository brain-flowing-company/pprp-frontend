import React from "react";

export default function PropertyMap({ name }: { name: string }) {
  let googleApiKey = process.env.GOOGLE_MAPS_API_KEY;
  return (
    <div className="flex flex-col gap-y-4">
      <div className="text-3xl font-bold">Location Map</div>
      <iframe
        width="100%"
        height="600"
        loading="lazy"
        allowFullScreen={true}
        referrerPolicy="no-referrer-when-downgrade"
        // src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyBNOLDzeFNz4y8LNAy0-hVenLGVGX06Y6U&q=${"จุฬา"}`}
        src={`https://www.google.com/maps/embed/v1/place?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&q=${name}`}
      ></iframe>
    </div>
  );
}
