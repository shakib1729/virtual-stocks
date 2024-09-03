// Libs
import type { ReactNode } from "react";
import { DocumentMagnifyingGlassIcon } from "@heroicons/react/24/outline";

// Types
import type { StockWithPrice } from "@/types";

const RowItem = ({
  value,
  className,
}: {
  value: ReactNode;
  className?: string;
}) => (
  <td className={`py-2 px-4 text-center align-middle ${className}`}>{value}</td>
);

const ColumnHeader = ({
  value,
  className,
}: {
  value: ReactNode;
  className?: string;
}) => <th className={`py-2 px-4 text-center ${className}`}>{value}</th>;

const Row = ({
  item,
  onSell,
}: {
  item: StockWithPrice;
  onSell: (item: StockWithPrice) => void;
}) => {
  const { investedAmount, symbol, quantity, pricePerUnit } = item;
  const currentValue = pricePerUnit * quantity;
  const profitLoss = currentValue - investedAmount;
  const avgPurchaseCost = investedAmount / quantity;
  return (
    <tr
      key={item.symbol}
      className="border-b border-gray-200 hover:bg-pink-50 transition duration-200 ease-in-out"
    >
      <RowItem value={symbol} className="text-left" />
      <RowItem value={quantity.toFixed(2)} />
      <RowItem value={investedAmount.toFixed(2)} />
      <RowItem value={avgPurchaseCost.toFixed(2)} />
      <RowItem value={pricePerUnit.toFixed(2)} />
      <RowItem value={currentValue.toFixed(2)} />
      <RowItem
        value={`${profitLoss.toFixed(2)} (${((profitLoss / investedAmount) * 100).toFixed(2)}%)`}
        className={`${profitLoss >= 0 ? "text-green-600" : "text-red-600"} font-semibold whitespace-nowrap`}
      />
      <RowItem
        value={
          <button
            onClick={() => onSell(item)}
            className="bg-gradient-to-r from-purple-400 to-pink-400 text-white font-bold py-1 px-3 rounded-md transition duration-200 ease-in-out hover:from-purple-500 hover:to-pink-500 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-opacity-50"
          >
            Sell
          </button>
        }
      />
    </tr>
  );
};

type Props = {
  stocks?: StockWithPrice[];
  onSell: (item: StockWithPrice) => void;
};

export const StockTable = ({ stocks, onSell }: Props) => (
  <div className="bg-white rounded-lg shadow-md overflow-hidden">
    <div className="overflow-x-auto max-h-[calc(100vh-24rem)] overflow-y-auto">
      <table className="w-full">
        <thead className="sticky top-0 bg-gray-100">
          <tr>
            <ColumnHeader value="Name" className="text-left" />
            <ColumnHeader value="Quantity" />
            <ColumnHeader value="Invested" />
            <ColumnHeader value="Average" />
            <ColumnHeader value="Price Per Unit" />
            <ColumnHeader value="Current Value" />
            <ColumnHeader value="Profit/Loss" />
            <ColumnHeader value="Action" />
          </tr>
        </thead>
        <tbody>
          {!stocks?.length ? (
            <tr>
              <td colSpan={8}>
                <div className="flex flex-col items-center justify-center py-16">
                  <DocumentMagnifyingGlassIcon className="h-24 w-24 text-gray-400 mb-4" />
                  <p className="text-center text-gray-500 text-lg">
                    No stocks in your portfolio. Start exploring and add some
                    stocks!
                  </p>
                </div>
              </td>
            </tr>
          ) : (
            stocks.map((item) => <Row item={item} onSell={onSell} />)
          )}
        </tbody>
      </table>
    </div>
  </div>
);
