export const PortfolioSummary = ({ totalInvested, currentValue }) => {
  const overallProfitLoss = currentValue - totalInvested;
  const overallProfitLossPercentage = (overallProfitLoss / totalInvested) * 100;

  return (
    <div className="bg-gradient-to-r from-purple-600 to-pink-500 text-white p-8 rounded-lg shadow-lg">
      <h1 className="text-3xl font-extrabold text-center mb-6">
        Your Stock Portfolio
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
        <div className="bg-white bg-opacity-20 rounded-xl p-4 backdrop-filter backdrop-blur-sm">
          <p className="text-sm font-medium mb-1">Total Invested</p>
          <p className="text-2xl font-bold">${totalInvested.toFixed(2)}</p>
        </div>
        <div className="bg-white bg-opacity-20 rounded-xl p-4 backdrop-filter backdrop-blur-sm">
          <p className="text-sm font-medium mb-1">Current Value</p>
          <p className="text-2xl font-bold">${currentValue.toFixed(2)}</p>
        </div>
        <div
          className={`bg-white bg-opacity-20 rounded-xl p-4 backdrop-filter backdrop-blur-sm ${overallProfitLoss >= 0 ? "text-green-300" : "text-red-200"}`}
        >
          <p className="text-sm font-medium mb-1">Overall Profit/Loss</p>
          <p className="text-2xl font-bold">
            ${overallProfitLoss.toFixed(2)} (
            {overallProfitLossPercentage.toFixed(2)}%)
          </p>
        </div>
      </div>
    </div>
  );
};
