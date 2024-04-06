import Image from "next/image";
type Icon = {
  size: number;
  className?: string;
};
export const BlueValidIcon = ({ size, className }: Icon) => {
  return (
    <Image
      src={"/img/login-register/blue-valid-icon.svg"}
      alt="blue-valid-icon"
      width={size}
      height={size}
      style={{ height: `${size}px`, width: "auto" }}
      className={className}
      draggable={false}
    />
  );
};
export const InvalidIcon = ({ size, className }: Icon) => {
  return (
    <Image
      src={"/img/InvalidIcon.png"}
      alt={"invalid-icon"}
      width={size}
      height={size}
      style={{ height: `${size}px`, width: "auto" }}
      className={className}
      draggable={false}
    />
  );
};
export const HamburgerIcon = ({ size, className }: Icon) => {
  return (
    <Image
      src={"/img/PropertyNavBar/hamburger-icon.svg"}
      alt={"hamburger-icon"}
      width={size}
      height={size}
      style={{ height: `${size}px`, width: "auto" }}
      className={className}
      draggable={false}
    />
  );
};
export const CheckCircleIcon = ({ size, className }: Icon) => {
  return (
    <Image
      src={"/img/edit-profile/baseline-check-circle.svg"}
      alt={"check-circle-icon"}
      width={size}
      height={size}
      style={{ height: `${size}px`, width: "auto" }}
      className={className}
      draggable={false}
    />
  );
};
export const CloseIcon = ({ size, className }: Icon) => {
  return (
    <Image
      src={"/img/black-close-icon.svg"}
      alt={"close-icon"}
      width={size}
      height={size}
      style={{ height: `${size}px`, width: "auto" }}
      className={className}
      draggable={false}
    />
  );
};
export const DropDownIcon = ({ size, className }: Icon) => {
  return (
    <Image
      src={"/img/edit-profile/drop-down-icon.svg"}
      alt={"drop-down-icon"}
      width={size}
      height={size}
      style={{ height: `${size}px`, width: "auto" }}
      className={className}
      draggable={false}
    />
  );
};
export const CreditCardIcon = ({ size, className }: Icon) => {
  return (
    <Image
      src={"/img/edit-profile/credit-card-icon.svg"}
      alt={"credit-card-icon"}
      width={size}
      height={size}
      style={{ height: `${size}px`, width: "auto" }}
      className={className}
      draggable={false}
    />
  );
};
export const ArrowLeft = ({ size, className }: Icon) => {
  return (
    <Image
      src={"/img/arrow-left.svg"}
      alt={"arrow-left-icon"}
      width={size}
      height={size}
      style={{ height: `${size}px`, width: "auto" }}
      className={className}
      draggable={false}
    />
  );
};


