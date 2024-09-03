// Libs
import { useState } from "react";
import {
  ArrowTrendingUpIcon,
  ArrowTrendingDownIcon,
} from "@heroicons/react/24/outline";

// Components
import { TransactionModal } from "@/components/TransactionModal";

// Hooks
import { useUser } from "@/hooks/useUser";
import type { User } from "@/types";

type Props = {
  symbol?: string;
  price?: number;
  change?: number;
  changePercent?: number;
  name?: string;
};

export const PriceOverview = ({
  symbol,
  price,
  change,
  changePercent,
  name,
}: Props) => {
  const { user, setUser } = useUser();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const handlePurchase = async (quantity: number) => {
    if (!user?.balance || !price) return;

    const cost = quantity * price;

    if (cost > user.balance) {
      alert("You don't have enough balance!");
      return;
    }

    const stockWithQuantity = user.stocks?.find(
      (stock) => stock.symbol === symbol
    ) ?? { symbol: symbol as string, quantity: 0, investedAmount: 0 };

    stockWithQuantity.quantity += quantity;
    stockWithQuantity.investedAmount += cost;

    const payload = {
      stocks: [
        ...(user.stocks?.filter((stock) => stock.symbol !== symbol) ?? []),
        stockWithQuantity,
      ],
      balance: (user.balance as number) - cost,
    };

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/updateStocksAndBalance`,
        {
          method: "POST",
          body: JSON.stringify(payload),
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );

      if (!res.ok) {
        throw new Error("Error occurred!");
      }

      setUser?.((prevUser) => ({ ...prevUser, ...payload }) as User);
      setIsModalOpen(false);
    } catch (e) {
      console.error("An error occuring during purchase!", e);
    }
  };

  const isPositiveChange = change && change >= 0;

  return (
    <>
      <div className="bg-white rounded-lg shadow-md p-6 mb-6 h-full">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h3 className="text-xl font-semibold text-gray-800">{name}</h3>
            <p className="text-sm text-gray-500">{symbol}</p>
          </div>
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-gradient-to-r from-purple-400 to-pink-400 text-white font-bold py-2 px-4 rounded-md transition duration-200 ease-in-out hover:from-purple-500 hover:to-pink-500 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-opacity-50"
          >
            Buy
          </button>
        </div>
        <div className="flex justify-between items-end">
          <div>
            <p className="text-3xl font-bold text-gray-900">
              ${price?.toFixed(2)}
            </p>
          </div>
          <div className="text-right">
            <p
              className={`text-lg font-semibold ${isPositiveChange ? "text-green-600" : "text-red-600"}`}
            >
              {isPositiveChange ? "+" : ""}
              {change?.toFixed(2)} ({changePercent?.toFixed(2)}%)
            </p>
            <div className="flex items-center justify-end">
              {isPositiveChange ? (
                <ArrowTrendingUpIcon className="h-5 w-5 text-green-600 mr-1" />
              ) : (
                <ArrowTrendingDownIcon className="h-5 w-5 text-red-600 mr-1" />
              )}
              <span className="text-sm text-gray-500">Today</span>
            </div>
          </div>
        </div>
      </div>
      {isModalOpen && symbol && price ? (
        <TransactionModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          stock={{ symbol, pricePerUnit: price }}
          onSubmit={handlePurchase}
          isBuying
        />
      ) : null}
    </>
  );
};
