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
    [symbol, onSymbolChange]
  );

  return (
    <StockContext.Provider value={stockProviderValue}>
      <div
        className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 grid-rows-10 md:grid-rows-9 xl:grid-rows-7 auto-rows-fr gap-6 px-10 py-10 xl:py-0 "
        style={{ height: "90%" }}
      >
        <div className="col-span-1 md:col-span-2 xl:col-span-3 row-span-1 flex justify-center items-center">
          <Search />
        </div>
        {symbol ? (
          <>
            <div className="md:col-span-2 row-span-6">
              <Chart
                timeSeriesData={timeSeriesData}
                resolution={resolution}
                handleResolutionChange={onResolutionChange}
              />
            </div>
            <div className="row-span-4 xl:row-span-2">
              <PriceOverview
                symbol={symbol}
                price={priceOverview?.c}
                change={priceOverview?.d}
                changePercent={priceOverview?.dp}
                name={details?.name}
              />
            </div>
            <div className="row-span-4 xl:row-span-4">
              <Details details={details} />
            </div>
          </>
        ) : null}
      </div>
    </StockContext.Provider>
  );
}
