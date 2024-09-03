// Libs
import { useState } from "react";

// Types
import type { StockWithPrice } from "@/types";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  stock: Pick<StockWithPrice, "symbol" | "pricePerUnit"> &
    Partial<Pick<StockWithPrice, "quantity">>;
  onSubmit: (quantity: number) => void;
  isBuying?: boolean;
};

export const TransactionModal = ({
  isOpen,
  onClose,
  stock,
  onSubmit,
  isBuying,
}: Props) => {
  const [quantity, setQuantity] = useState<string>("");

  if (!isOpen) return null;

  const totalAmount = (parseFloat(quantity) ?? 0) * stock.pricePerUnit;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div
        className="bg-white p-8 rounded-lg shadow-2xl max-w-md w-full transform transition-all duration-200 ease-in-out"
        style={{ animation: "fadeInUp 0.2s" }}
      >
        <h2 className="text-2xl font-bold mb-6 text-gray-900">
          {isBuying ? "Buy" : "Sell"} {stock.symbol}
        </h2>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            onSubmit(parseFloat(quantity));
          }}
          className="space-y-6"
        >
          <div>
            <label
              htmlFor="quantity"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Quantity to{" "}
              {isBuying
                ? `buy (Total: ${totalAmount ? totalAmount.toFixed(2) : 0})`
                : `sell (max: ${stock.quantity})`}
            </label>
            <input
              type="number"
              id="quantity"
              value={quantity}
              onChange={(e) => {
                const value = parseFloat(e.target.value);
                setQuantity(value.toString());
              }}
              step="0.01"
              min="0"
              max={stock.quantity}
              className="mt-1 block w-full rounded-md border-gray-300 border shadow-sm focus:border-purple-500 focus:ring focus:ring-purple-200 focus:ring-opacity-50 transition duration-200 ease-in-out py-1 px-3"
              required
            />
          </div>
          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-gradient-to-r from-purple-400 to-pink-400 text-white rounded-md hover:from-purple-500 hover:to-pink-500 transition duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-opacity-50"
            >
              Confirm {isBuying ? "Purchase" : "Sale"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
