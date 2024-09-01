"use client";

// Libs
import { useMemo } from "react";

// Components
import { Search } from "@/components/explore/Search";
import { PriceOverview } from "@/components/explore/PriceOverview";
import Chart from "@/components/explore/chart";
import { Details } from "@/components/explore/Details";

// Hooks
import { useDashboardState } from "@/hooks/useDashboardState";

// Contexts
import StockContext from "@/context/StockContext";

export default function Home() {
  const {
    symbol,
    timeSeriesData,
    resolution,
    priceOverview,
    details,
    onSymbolChange,
    onResolutionChange,
  } = useDashboardState();

  const stockProviderValue = useMemo(
    () => ({ symbol, onSymbolChange }),
    [symbol, onSymbolChange],
  );

  return (
    <StockContext.Provider value={stockProviderValue}>
      <div className="h-screen grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 grid-rows-8 md:grid-rows-7 xl:grid-rows-5 auto-rows-fr gap-6 p-10">
        <div className="col-span-1 md:col-span-2 xl:col-span-3 row-span-1 flex justify-start items-center">
          <Search />
        </div>
        <div className="md:col-span-2 row-span-4">
          <Chart
            timeSeriesData={timeSeriesData}
            resolution={resolution}
            handleResolutionChange={onResolutionChange}
          />
        </div>
        <div className="row-span-2 xl:row-span-1">
          <PriceOverview
            symbol={symbol}
            price={priceOverview?.c}
            change={priceOverview?.d}
            changePercent={priceOverview?.dp}
            currency={details?.currency}
            name={details?.name}
          />
        </div>
        <div className="row-span-2 xl:row-span-3">
          <Details details={details} />
        </div>
      </div>
    </StockContext.Provider>
  );
}
