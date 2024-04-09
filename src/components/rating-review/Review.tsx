import ReviewCard from "./ReviewCard";
import PropertyData from "@/models/PropertyData";

const Review = ({ property }: { property: PropertyData }) => {
  return <ReviewCard property={property} />;
};

export default Review;
