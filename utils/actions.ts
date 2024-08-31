"use server";

const FINNHUB_BASE_PATH = "https://finnhub.io/api/v1";
const ALPHAVANTAGE_BASE_PATH = "https://www.alphavantage.co/";

const RESOLUTION_VS_TIME_SERIES_DATA_API_FUNCTION = {
  Daily: "TIME_SERIES_DAILY",
  Weekly: "TIME_SERIES_WEEKLY",
  Monthly: "TIME_SERIES_MONTHLY",
};

const RESOLUTION_VS_DATA_KEY = {
  Daily: "Time Series (Daily)",
  Weekly: "Weekly Time Series",
  Monthly: "Monthly Time Series",
};

const RESOLUTION_VS_NUMBER_OF_VALUES = {
  Daily: 100,
  Weekly: 52,
  Monthly: 24,
};

const handleFetch = async (url) => {
  const response = await fetch(url);

  if (!response.ok) {
    const message = `An error has occurred: ${response.status}`;
    return new Error(message);
  }

  return await response.json();
};

export const searchSymbols = async (query) => {
  const url = `${FINNHUB_BASE_PATH}/search?q=${query}&token=${process.env.FINNHUB_API_KEY}`;
  return handleFetch(url);
};

export const fetchStockDetails = async (stockSymbol) => {
  const url = `${FINNHUB_BASE_PATH}/stock/profile2?symbol=${stockSymbol}&token=${process.env.FINNHUB_API_KEY}`;
  return handleFetch(url);
};

export const fetchQuote = async (stockSymbol) => {
  const url = `${FINNHUB_BASE_PATH}/quote?symbol=${stockSymbol}&token=${process.env.FINNHUB_API_KEY}`;
  return handleFetch(url);
};

export const fetchTimeSeriesData = async ({ stockSymbol, resolution }) => {
  const url = `${ALPHAVANTAGE_BASE_PATH}/query?function=${RESOLUTION_VS_TIME_SERIES_DATA_API_FUNCTION[resolution]}&symbol=${stockSymbol}&apikey=${process.env.ALPHAVANTAGE_API_KEY}`;
  const data = await handleFetch(url);

  const timeSeriesData = data[RESOLUTION_VS_DATA_KEY[resolution]];

  return Object.keys(timeSeriesData)
    .map((date) => {
      return {
        value: +(+timeSeriesData[date]["4. close"]).toFixed(2),
        date,
      };
    })
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, RESOLUTION_VS_NUMBER_OF_VALUES[resolution])
    .reverse();
};
