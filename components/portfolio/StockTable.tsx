const Row = ({ item, onSell }) => {
  const { investedAmount, symbol, quantity, pricePerUnit } = item;
  const currentValue = pricePerUnit * quantity;
  const profitLoss = currentValue - investedAmount;
  const avgPurchaseCost = investedAmount / quantity;
  return (
    <tr
      key={item.symbol}
      className="border-b border-gray-200 hover:bg-pink-50 transition duration-200 ease-in-out"
    >
      <td className="py-2 px-4 text-left align-middle">{symbol}</td>
      <td className="py-2 px-4 text-center align-middle">{quantity}</td>
      <td className="py-2 px-4 text-center align-middle">
        ${investedAmount.toFixed(2)}
      </td>
      <td className="py-2 px-4 text-center align-middle">
        ${avgPurchaseCost.toFixed(2)}
      </td>
      <td className="py-2 px-4 text-center align-middle">
        ${pricePerUnit.toFixed(2)}
      </td>
      <td className="py-2 px-4 text-center align-middle">
        ${currentValue.toFixed(2)}
      </td>
      <td
        className={`py-2 px-4 text-center align-middle ${profitLoss >= 0 ? "text-green-600" : "text-red-600"} font-semibold whitespace-nowrap`}
      >
        ${profitLoss.toFixed(2)} (
        {((profitLoss / investedAmount) * 100).toFixed(2)}%)
      </td>
      <td className="py-2 px-4 text-center align-middle">
        <button
          onClick={() => onSell(item)}
          className="bg-gradient-to-r from-purple-400 to-pink-400 text-white font-bold py-1 px-3 rounded-md transition duration-200 ease-in-out hover:from-purple-500 hover:to-pink-500 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-opacity-50"
        >
          Sell
        </button>
      </td>
    </tr>
  );
};

export const StockTable = ({ stocks, onSell }) => (
  <div className="bg-white rounded-lg shadow-md overflow-hidden">
    <div className="overflow-x-auto max-h-[calc(100vh-24rem)] overflow-y-auto">
      <table className="w-full">
        <thead className="sticky top-0 bg-gray-100">
          <tr>
            <th className="py-2 px-4 text-left">Name</th>
            <th className="py-2 px-4 text-center">Quantity</th>
            <th className="py-2 px-4 text-center">Invested</th>
            <th className="py-2 px-4 text-center">Average</th>
            <th className="py-2 px-4 text-center">Price Per Unit</th>
            <th className="py-2 px-4 text-center">Current Value</th>
            <th className="py-2 px-4 text-center">Profit/Loss</th>
            <th className="py-2 px-4 text-center">Action</th>
          </tr>
        </thead>
        <tbody>
          {stocks.map((item) => (
            <Row item={item} onSell={onSell} />
          ))}
        </tbody>
      </table>
    </div>
  </div>
);
