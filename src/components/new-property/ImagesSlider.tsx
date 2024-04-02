import React, { useState, useEffect } from "react";
import "@/components/new-property/ImagesSlider.css";
import PropertyImages from "@/models/PropertyData";

const Slider = ({
  imageList,
  width,
  height,
  loop = true,
  autoPlay = true,
  autoPlayInterval = 3000,
  showArrowControls = true,
  showDotControls = true,
  bgColor = "none",
}: {
  imageList: PropertyImages[];
  width: number;
  height: number;
  loop: boolean;
  autoPlay: boolean;
  autoPlayInterval: number;
  showArrowControls: boolean;
  showDotControls: boolean;
  bgColor: string;
}) => {
  let [active, setActive] = useState(0);

  const setPreviousImage = () => {
    if (active !== 0) {
      setActive((active -= 1));
    } else {
      if (loop) {
        setActive((active = imageList.length - 1));
      }
    }
  };

  const setNextImage = () => {
    if (active !== imageList.length - 1) {
      setActive((active += 1));
    } else {
      if (loop) {
        setActive((active = 0));
      }
    }
  };

  const leftClickHandle = () => {
    setPreviousImage();
  };

  const rightClickHandle = () => {
    setNextImage();
  };

  const dotClickHandler = (e: {
    target: { getAttribute: (arg0: string) => any };
  }) => {
    const dotNum = e.target.getAttribute("data-key");
    setActive((active = parseInt(dotNum)));
  };

  useEffect(() => {
    if (autoPlay) {
      let autoSlider = setInterval(setNextImage, autoPlayInterval);
      return () => clearInterval(autoSlider);
    }
  }, [active]);

  return (
    <div className="flex w-full flex-col">
      <div>
        <div className="wrapper" style={{ backgroundColor: bgColor }}>
          {((showArrowControls && !loop && active !== 0) ||
            (showArrowControls && loop)) && (
            <div className="leftClick" onClick={leftClickHandle}>
              <img className="button" src="/img/property/back.svg" alt="back" />
            </div>
          )}
          <img
            src={imageList[active]?.image_url || "/img/home-page/lumpini.png"}
            style={{
              width: width,
              height: height,
              objectFit: "cover",
            }}
            alt="image"
          />
          {((showArrowControls && !loop && active !== imageList.length - 1) ||
            (showArrowControls && loop)) && (
            <div className="rightClick" onClick={rightClickHandle}>
              <img className="button" src="/img/property/next.svg" alt="next" />
            </div>
          )}
        </div>
        {showDotControls && (
          <div className="dots">
            {imageList.map((el, index) => {
              if (index !== active) {
                return (
                  <div
                    key={index}
                    className="dot"
                    data-key={index}
                    onClick={() => {
                      dotClickHandler;
                    }}
                  />
                );
              } else {
                return <div key={index} className="activeDot"></div>;
              }
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default Slider;
