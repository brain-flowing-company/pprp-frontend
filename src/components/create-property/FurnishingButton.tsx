export default function FurnishingButton({ furnishing, label, tag, onClick }) {
  return (
    <button
      className={`text-c-sm w-full rounded-md py-2 outline outline-1 outline-ci-gray hover:bg-ci-dark-gray ${
        furnishing === tag ? "bg-ci-black text-white" : "bg-white text-gray-700"
      }`}
      onClick={onClick}
    >
      {label}
    </button>
  );
}
