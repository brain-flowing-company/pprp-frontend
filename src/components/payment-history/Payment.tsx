const Payment = ({
  name,
  date,
  time,
  type,
  amount,
}: {
  name: string;
  date: string;
  time: string;
  type: string;
  amount: number;
}) => {
  function formatPrice(num: number): string {
    if (num) {
      return Math.round(num)
        .toString()
        .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
    return "0";
  }

  return (
    <div className="bg-ci-light-gray p-4 border border-1 border-ci-dark-gray">
      <div className="grid grid-cols-5 gap-5 justify-center items-center">
        <div className="text-center">{name}</div>
        <div className="text-center">
          {date} {" - "} {time}
        </div>
        <div className="text-center">{type}</div>
        <div
          className={`text-center ${
            type !== "Received" ? "text-ci-red" : "text-ci-light-blue"
          }`}
        >
          {type !== "Received" ? "- ฿" : "+ ฿"} {formatPrice(amount)}
        </div>
        <div className="text-center">
          <button className="w-4/5 bg-ci-blue text-white font-regular py-2 px-4 rounded-lg">
            Detail
          </button>
        </div>
      </div>
    </div>
  );
};

export default Payment;
