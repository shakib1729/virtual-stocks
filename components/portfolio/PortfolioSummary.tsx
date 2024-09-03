const SummaryItem = ({
  title,
  value,
  className,
}: {
  title: string;
  value: string;
  className?: string;
}) => (
  <div
    className={`bg-white bg-opacity-20 rounded-xl p-4 backdrop-filter backdrop-blur-sm ${className}`}
  >
    <p className="text-sm font-medium mb-1">{title}</p>
    <p className="text-2xl font-bold">${value}</p>
  </div>
);

type Props = { totalInvested: number; currentValue: number };

export const PortfolioSummary = ({ totalInvested, currentValue }: Props) => {
  const overallProfitLoss = currentValue - totalInvested;
  const overallProfitLossPercentage =
    totalInvested > 0 ? (overallProfitLoss / totalInvested) * 100 : 0;

  return (
    <div className="bg-gradient-to-r from-purple-600 to-pink-500 text-white p-8 rounded-lg shadow-lg">
      <h1 className="text-3xl font-extrabold text-center mb-6">
        Your Stock Portfolio
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
        <SummaryItem title="Total Invested" value={totalInvested.toFixed(2)} />
        <SummaryItem title="Current Value" value={currentValue.toFixed(2)} />
        <SummaryItem
          title="Overall Profit/Loss"
          value={`${overallProfitLoss.toFixed(2)} (${overallProfitLossPercentage.toFixed(2)}%)`}
          className={overallProfitLoss >= 0 ? "text-green-300" : "text-red-200"}
        />
      </div>
    </div>
  );
};
