"use client";

import Banner from "@/components/home-page/Banner";
import FeaturesPropCatalog from "@/components/home-page/FeaturesPropCatalog";
import InformationBar from "@/components/home-page/InformationBar";

export default function HomePage() {
  return (
    <main>
      <Banner />
      <InformationBar />
      <FeaturesPropCatalog />
    </main>
  );
}
