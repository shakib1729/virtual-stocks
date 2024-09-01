export type StockWithQuantity = {
  symbol: string;
  quantity: number;
  investedAmount: number;
};

export type StockWithPrice = StockWithQuantity & { pricePerUnit: number };

export type User = {
  id: string;
  name: string;
  email: string;
  balance?: number;
  stocks?: StockWithQuantity[];
};
