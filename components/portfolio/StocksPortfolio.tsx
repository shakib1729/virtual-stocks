// Libs
import { useState, useMemo } from "react";

// Components
import { PortfolioSummary } from "@/components/portfolio/PortfolioSummary";
import { StockTable } from "@/components/portfolio/StockTable";
import { SellModal } from "@/components/portfolio/SellModal";

// Hooks
import { useUser } from "@/hooks/useUser";

// Types
import type { StockWithPrice, User } from "@/types";

type Props = {
  stocks?: StockWithPrice[];
  balance?: number;
};

export const StocksPortfolio = ({ stocks, balance }: Props) => {
  const { setUser } = useUser();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedStock, setSelectedStock] = useState<
    StockWithPrice | undefined
  >();

  const { totalInvested, currentValue } = useMemo(() => {
    return (
      stocks?.reduce(
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
        },
      ) ?? { totalInvested: 0, currentValue: 0 }
    );
  }, [stocks]);

  const handleSell = (stock: StockWithPrice) => {
    setSelectedStock(stock);
    setIsModalOpen(true);
  };

  const handleSubmit = async (quantity: number) => {
    if (!selectedStock) return;

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
      balance: (balance as number) + sellCost,
    };

    try {
      await fetch(`${process.env.NEXT_PUBLIC_API_URL}/updateStocksAndBalance`, {
        method: "POST",
        body: JSON.stringify(payload),
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      setUser?.((prevUser) => ({ ...prevUser, ...payload }) as User);
      setIsModalOpen(false);
    } catch (error) {
      console.error("An error occuring during sale!", error);
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
