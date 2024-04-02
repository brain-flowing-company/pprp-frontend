import React, { useState, useEffect } from "react";

interface ListingTypeProps {
  selectedType: string;
  onOptionChange: (type: string) => void;
}

const ListingType: React.FC<ListingTypeProps> = ({
  selectedType,
  onOptionChange,
}) => {
  const [selectedOption, setSelectedOption] = useState<string>("");
  const [hoveredOption, setHoveredOption] = useState<string>("");

  useEffect(() => {
    setSelectedOption(selectedType);
  }, [selectedType]);

  const handleOptionChange = (option: string) => {
    setSelectedOption(option);
    onOptionChange(option);
  };

  const handleMouseEnter = (option: string) => {
    setHoveredOption(option);
  };

  const handleMouseLeave = () => {
    setHoveredOption("");
  };

  const labelStyle: React.CSSProperties = {
    display: "inline-block",
    padding: "10px 20px",
    backgroundColor: "#FFFFFF",
    border: "1px solid #B3B3B3",
    borderRadius: "10px",
    cursor: "pointer",
    width: "100%",
    height: "60px",
    fontSize: "24px",
    textAlign: "center",
    color: "#0F142E",
    overflow: "hidden",
  };

  const selectedStyle: React.CSSProperties = {
    ...labelStyle,
    backgroundColor: "#0F142E",
    color: "#FFFFFF",
  };

  const hoverStyle: React.CSSProperties = {
    ...labelStyle,
    backgroundColor: "#B3B3B3",
  };

  const noOptionSelectedStyle: React.CSSProperties = {
    ...labelStyle,
    border: "1px solid red",
  };

  return (
    <div className="grid gap-6 sm:grid-cols-3">
      <input
        type="radio"
        id="rent"
        name="listingType"
        value="rent"
        checked={selectedOption === "rent"}
        onChange={() => handleOptionChange("rent")}
        style={{ display: "none" }}
      />
      <label
        htmlFor="rent"
        style={{
          ...(selectedOption === "rent"
            ? selectedStyle
            : hoveredOption === "rent"
              ? hoverStyle
              : selectedType === ""
                ? noOptionSelectedStyle
                : labelStyle),
        }}
        onMouseEnter={() => handleMouseEnter("rent")}
        onMouseLeave={handleMouseLeave}
      >
        Rent
      </label>

      <input
        type="radio"
        id="sell"
        name="listingType"
        value="sell"
        checked={selectedOption === "sell"}
        onChange={() => handleOptionChange("sell")}
        style={{ display: "none" }}
      />
      <label
        htmlFor="sell"
        style={{
          ...(selectedOption === "sell"
            ? selectedStyle
            : hoveredOption === "sell"
              ? hoverStyle
              : selectedType === ""
                ? noOptionSelectedStyle
                : labelStyle),
        }}
        onMouseEnter={() => handleMouseEnter("sell")}
        onMouseLeave={handleMouseLeave}
      >
        Sell
      </label>

      <input
        type="radio"
        id="rent/sell"
        name="listingType"
        value="rent/sell"
        checked={selectedOption === "rent/sell"}
        onChange={() => handleOptionChange("rent/sell")}
        style={{ display: "none" }}
      />
      <label
        htmlFor="rent/sell"
        style={{
          ...(selectedOption === "rent/sell"
            ? selectedStyle
            : hoveredOption === "rent/sell"
              ? hoverStyle
              : selectedType === ""
                ? noOptionSelectedStyle
                : labelStyle),
        }}
        onMouseEnter={() => handleMouseEnter("rent/sell")}
        onMouseLeave={handleMouseLeave}
      >
        Rent/Sell
      </label>
    </div>
  );
};

export default ListingType;