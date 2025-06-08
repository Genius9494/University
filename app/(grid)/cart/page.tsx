// app/cart/page.tsx
'use client';

import { useCart } from "../../store/cartStore";
import Link from "next/link";
import { FaCartShopping } from "react-icons/fa6";
import toast from "react-hot-toast";
import SideBar from "../../components/nav/SideBar";


export default function CartPage() {
  const { cart, removeFromCart, clearCart } = useCart();

  const totalPrice = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  
  
  return (
    
      
    <div className="p-6 bg-cyan-900 rounded-2xl w-full mt-10 ">
      
      <h1 className="flex items-center gap-4 text-2xl font-bold mb-4 text-white">Shopping Cart <FaCartShopping /> </h1>
      
      {cart.length === 0 ? (
        <p className="text-gray-300 bg-gray-500 p-4 rounded-2xl">There are no games in the shopping cart</p>
      ) : (
        <div className="space-y-4">
          {cart.map((item) => (
            <div key={item.id} className="flex justify-between items-center bg-gray-800 p-4 rounded-2xl overflow-y-auto">
              <div>
                <p className="text-white font-medium">{item.name}</p>
                <p className="text-gray-300 text-sm mt-4 gap-4"> Quantity: {item.quantity}</p>
              </div>
              <div className="flex items-center gap-2">
                <p className="text-white font-bold">${(item.price/100 * item.quantity).toFixed(2)}</p>
                <button
                  onClick={() => removeFromCart(item.id) }
                  className="text-red-500 text-sm"
                >
                  Delete
                </button>
              </div>
            </div>
            
          ))}

          <div className="flex justify-between items-center mt-4 border-t border-gray-600 pt-4">
            <span className="text-white font-semibold">Total :</span>
            <span className="text-green-400 font-bold text-lg">${(totalPrice/100).toFixed(2)}</span>
          </div>

          <button
            onClick={clearCart}
            className="bg-red-500 text-white px-4 py-2 rounded-2xl hover:bg-red-400 mt-4"
          >
            Empty the shopping cart
          </button>
        </div>
        
      )}

      <Link href="/games" className="text-yellow-500 decoration-0 hover:text-green-500 block mt-6">
      Back To Home ⬅ 
      </Link>
    </div>
    
  );
}
