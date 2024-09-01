// Libs
import type { MouseEvent } from "react";

// Components
import { Card } from "@/components/Card";

// Hooks
import { useUser } from "@/hooks/useUser";
import { User } from "@/types";

type Props = {
  symbol?: string;
  price?: number;
  change?: number;
  changePercent?: number;
  currency?: string;
  name?: string;
};

export const PriceOverview = ({
  symbol,
  price,
  change,
  changePercent,
  currency,
  name,
}: Props) => {
  const { user, setUser } = useUser();

  const handlePurchase = async (event: MouseEvent<HTMLFormElement>) => {
    if (!user || !price) return;

    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const formValues = Array.from(formData.entries()).reduce(
      (acc, [key, value]) => {
        acc[key] = value;
        return acc;
      },
      {} as Record<string, FormDataEntryValue>,
    );

    const quantity = +(formValues.quantity ?? 0);
    const cost = quantity * price;

    const stockWithQuantity = user.stocks?.find(
      (stock) => stock.symbol === symbol,
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
      await fetch(`${process.env.NEXT_PUBLIC_API_URL}/updateStocksAndBalance`, {
        method: "POST",
        body: JSON.stringify(payload),
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      setUser?.((prevUser) => ({ ...prevUser, ...payload }) as User);
    } catch (e) {
      console.error("An error occuring during purchase!", e);
    }
  };

  return (
    <Card>
      <span className="absolute left-4 top-4 text-neutral-400 text-lg xl:text-xl 2xl:text-2xl">
        {symbol}
      </span>
      <span className="absolute left-4 top-4 text-neutral-400 text-lg xl:text-xl 2xl:text-2xl">
        {name}
      </span>
      <div className="w-full h-full flex items-center justify-around xl:mt-3">
        <span className="text-2xl xl:text-4xl 2xl:text-5xl flex items-center">
          ${price}
          <span className="text-xl xl:text-xl 2xl:text-2xl text-neutral-400 m-2">
            {currency}
          </span>
        </span>
        <span
          className={`text-lg xl:text-xl 2xl:text-2xl ${(change as number) > 0 ? "text-lime-500" : "text-red-500"}`}
        >
          {change} <span>({changePercent}%)</span>
        </span>
        <form onSubmit={handlePurchase}>
          <div>
            <label htmlFor="quantity">Quantity</label>
            <input
              id="quantity"
              name="quantity"
              type="number"
              placeholder="Enter Quantity"
            />
          </div>
          <button type="submit">Buy</button>
        </form>
      </div>
    </Card>
  );
};
