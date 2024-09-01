import React, { useState, useMemo, useContext } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import {
  CurrencyDollarIcon,
  UserIcon,
  ArrowRightOnRectangleIcon,
  GlobeAltIcon,
  ChartBarIcon,
  ChartPieIcon,
} from "@heroicons/react/24/outline";

import { PortfolioSummary } from "@/components/portfolio/PortfolioSummary";
import { StockTable } from "@/components/portfolio/StockTable";
import { SellModal } from "@/components/portfolio/SellModal";
import UserContext from "@/context/UserContext";

// For each stock:
// symbol, quantity, investedAmount, pricePerUnit

export const PortfolioStocks = ({ stocks, balance }) => {
  const { setUser } = useContext(UserContext);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedStock, setSelectedStock] = useState(null);

  const { totalInvested, currentValue } = useMemo(() => {
    return stocks.reduce(
      (acc, item) => {
        const { investedAmount, quantity, pricePerUnit } = item;
        const currentValue = pricePerUnit * quantity;

        return {
          totalInvested: acc.totalInvested + investedAmount,
          currentValue: acc.currentValue + currentValue,
        };
      },
      {
        totalInvested: 0,
        currentValue: 0,
      }
    );
  }, [stocks]);

  const handleSell = (stock) => {
    setSelectedStock(stock);
    setIsModalOpen(true);
  };

  const handleSubmit = async (quantity) => {
    const sellCost = quantity * selectedStock.pricePerUnit;
    const avgPurchaseCost =
      selectedStock.investedAmount / selectedStock.quantity;

    const stockWithQuantity = { ...selectedStock };

    stockWithQuantity.quantity -= quantity;

    stockWithQuantity.investedAmount -= avgPurchaseCost * quantity;

    const payload = {
      stocks: [
        ...(stocks?.filter((stock) => stock.symbol !== selectedStock.symbol) ??
          []),
        ...(stockWithQuantity.quantity > 0 ? [stockWithQuantity] : []),
      ],
      balance: balance + sellCost,
    };

    try {
      const response = await fetch(
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

      setUser((prevUser) => ({ ...prevUser, ...payload }));
      setIsModalOpen(false);
    } catch (e) {
      console.error("An error occuring during sale!", e);
    }
  };

  return (
    <>
      <div className="py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto space-y-8">
          <PortfolioSummary
            totalInvested={totalInvested}
            currentValue={currentValue}
          />
          <StockTable stocks={stocks} onSell={handleSell} />
        </div>
      </div>

      {selectedStock && (
        <SellModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          stock={selectedStock}
          onSubmit={handleSubmit}
        />
      )}
      <style jsx global>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translate3d(0, 40px, 0);
          }
          to {
            opacity: 1;
            transform: translate3d(0, 0, 0);
          }
        }
      `}</style>
    </>
  );
};
