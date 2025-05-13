"use client";

import React from "react";

type BuyButtonProps = {
  name: string;
  price: number;
};

const BuyButton: React.FC<BuyButtonProps> = ({ name, price }) => {
  const handleBuy = async () => {
    const res = await fetch("/api/checkout", {
      method: "POST",
      body: JSON.stringify({ name, price }),
    });

    const data = await res.json();
    if (data.url) {
      window.location.href = data.url;
    }
  };

  return (
    <button
      onClick={handleBuy}
      className="bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-xl mt-2"
    >
      شراء بـ ${(price / 100).toFixed(2)}
    </button>
  );
};

export default BuyButton;
