'use client';

import { useCart } from "app/hooks/useCart";

export default function CartPage() {
  const { cart, removeFromCart } = useCart();

  if (cart.length === 0) return <p className="p-4">السلة فارغة.</p>;

  return (
    <div className="p-4 space-y-4">
      <h1 className="text-xl font-bold">سلة المشتريات</h1>
      {cart.map((item) => (
        <div key={item.id} className="flex justify-between border-b pb-2">
          <span>{item.name} × {item.quantity}</span>
          <button
            onClick={() => removeFromCart(item.id)}
            className="text-red-500 hover:underline"
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}
