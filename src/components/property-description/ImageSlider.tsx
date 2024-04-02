import PropertyImages from "@/models/PropertyData";
import Image from "next/image";
import { useState } from "react";
const closeIcon = "/img/white-close-icon.svg";

const ImageSlider = ({ images }: { images: PropertyImages[] }) => {
  const [currentImage, setCurrentImage] = useState(0);
  const [displayImage, setDisplayImage] = useState(false);
  const updateCurrentImage = (index: number) => {
    if (index < 0) index = images.length - 1;
    const i = index % images.length;
    setCurrentImage(i);
    setDisplayImage(true);
  };
  return (
    <div>
      <div className="flex h-fit flex-row gap-1 overflow-x-auto w-full">
        {images.map((img, i) => (
          <div className="relative aspect-video h-64 sm:h-72 md:h-96" key={i}>
            <Image
              className="cursor-pointer"
              src={img.image_url}
              alt={`Image ${i + 1}`}
              layout="fill"
              objectFit="cover"
              onClick={() => updateCurrentImage(i)}
              draggable={false}
            />
          </div>
        ))}
      </div>
      {displayImage && (
        <div className="fixed left-0 top-0 z-30 flex h-full w-full flex-row items-center justify-center bg-black bg-opacity-40">
          <button
            className="absolute right-4 top-24 cursor-pointer border-none bg-transparent text-black hover:opacity-50"
            onClick={() => setDisplayImage(false)}
          >
            <Image
              src={closeIcon}
              alt={`close`}
              width={0}
              height={0}
              style={{ width: "400%", height: "auto" }}
              draggable={false}
              // className="h-auto max-w-full"
            />
          </button>
          <button
            className="absolute left-4 top-1/2  cursor-pointer border-none bg-transparent text-[40px] text-white hover:opacity-50"
            onClick={() => updateCurrentImage(currentImage - 1)}
          >
            {"<"}
          </button>
          <Image
            src={images[currentImage].image_url}
            alt={`Image`}
            width={0}
            height={0}
            sizes="100vw"
            style={{ width: "auto", maxHeight: "75%" }}
            draggable={false}
          />
          <button
            className="absolute right-4 top-1/2 cursor-pointer border-none bg-transparent text-[40px] text-white hover:opacity-50"
            onClick={() => updateCurrentImage(currentImage + 1)}
          >
            {">"}
          </button>
        </div>
      )}
    </div>
  );
};

export default ImageSlider;