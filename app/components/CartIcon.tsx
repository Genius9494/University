'use client';

import Link from "next/link";
import { useCart } from "../../app/hooks/useCart"

export default function CartIcon() {
  const { cart } = useCart();
  const itemCount = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <Link href="/cart" className="relative">
      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" strokeWidth="2"
        viewBox="0 0 24 24">
        <path d="M3 3h2l.4 2M7 13h14l1-5H8.4" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      {itemCount > 0 && (
        <span className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full px-2 text-xs">
          {itemCount}
        </span>
      )}
    </Link>
  );
}
