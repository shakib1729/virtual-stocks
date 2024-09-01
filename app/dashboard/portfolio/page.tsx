"use client";

// Components
import { PortfolioStocks } from "@/components/portfolio/PortfolioStocks";

// Hooks
import { useUser } from "@/hooks/useUser";
import { usePortfolioStocks } from "@/hooks/usePortfolioStocks";

export default function Home() {
  const { user } = useUser();
  const portfolioStocks = usePortfolioStocks();

  return portfolioStocks && user ? (
    <PortfolioStocks stocks={portfolioStocks} balance={user.balance} />
  ) : null;
}
