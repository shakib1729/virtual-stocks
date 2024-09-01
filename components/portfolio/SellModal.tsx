import React, { useState, useMemo } from "react";
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

export const SellModal = ({ isOpen, onClose, stock, onSubmit }) => {
  const [quantity, setQuantity] = useState("");

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div
        className="bg-white p-8 rounded-lg shadow-2xl max-w-md w-full transform transition-all duration-200 ease-in-out"
        style={{ animation: "fadeInUp 0.2s" }}
      >
        <h2 className="text-2xl font-bold mb-6 text-gray-900">
          Sell {stock.symbol}
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
              Quantity to sell (max: {stock.quantity})
            </label>
            <input
              type="number"
              id="quantity"
              value={quantity}
              onChange={(e) => {
                const value = Math.max(
                  0,
                  Math.min(stock.quantity, parseFloat(e.target.value) || 0)
                );
                setQuantity(value.toString());
              }}
              step="0.01"
              min="0"
              max={stock.quantity}
              className="mt-1 block w-full rounded-md border-gray-300 border shadow-sm focus:border-purple-500 focus:ring focus:ring-purple-200 focus:ring-opacity-50 transition duration-200 ease-in-out"
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
              Confirm Sale
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
