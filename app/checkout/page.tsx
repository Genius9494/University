"use client";
import { loadStripe } from "@stripe/stripe-js";
import { useState } from "react";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY!);

export default function CheckoutPage() {
  const [loading, setLoading] = useState(false);

  const handleCheckout = async () => {
    setLoading(true);

    const items = [
      {
        price_data: {
          currency: "usd",
          product_data: {
            name: "Awesome Game",
          },
          unit_amount: 1999, // السعر بالسنت (يعني 19.99 دولار)
        },
        quantity: 1,
      },
    ];

    const res = await fetch("/api/create-checkout-session", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ items }),
    });

    const data = await res.json();

    if (data.url) {
      window.location.href = data.url;
    } else {
      alert("فشل إنشاء جلسة الدفع");
      setLoading(false);
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">ادفع لشراء اللعبة</h1>
      <button
        onClick={handleCheckout}
        disabled={loading}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        {loading ? "جارٍ التوجيه..." : "الدفع الآن"}
      </button>
    </div>
  );
}
