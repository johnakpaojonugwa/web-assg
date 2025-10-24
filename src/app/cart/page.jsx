"use client";

import Image from "next/image";
import { useApp } from "@/context/AppContext";
import { FaTimes } from "react-icons/fa";
import Link from "next/link";


export default function CartPage() {
  const { cart, removeFromCart, decrement, addToCart, clearCart, totalPrice } = useApp();

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-5 sm:px-10">
      <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-md p-6 sm:p-10">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Your Cart</h1>

        {cart.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-gray-500 text-lg mb-3">Your cart is empty 🛒</p>
            <Link
              href="/"
              className="inline-block mt-4 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md transition"
            >
              Continue Shopping
            </Link>
          </div>
        ) : (
          <>
            {/* CART TABLE */}
            <div className="overflow-x-auto">
              <table className="w-full border-collapse min-w-[600px]">
                <thead>
                  <tr className="border-b text-left bg-gray-100">
                    <th className="py-3 px-4 text-gray-600 font-semibold">Product</th>
                    <th className="py-3 px-4 text-gray-600 font-semibold">Price</th>
                    <th className="py-3 px-4 text-gray-600 font-semibold">Quantity</th>
                    <th className="py-3 px-4 text-gray-600 font-semibold">Total</th>
                    <th className="py-3 px-4 text-gray-600 font-semibold text-center">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {cart.map((item) => (
                    <tr key={item.id} className="border-b border-b-gray-200 hover:bg-gray-50 transition">
                      <td className="py-4 px-4 flex items-center gap-4">
                        <div className="w-16 h-16 relative flex-shrink-0">
                          <Image
                            src={item.image}
                            alt={item.title}
                            fill
                            className="object-cover rounded-md"
                          />
                        </div>
                        <span className="font-medium text-gray-800">{item.title}</span>
                      </td>
                      <td className="py-4 px-4 text-gray-700">${item.price.toFixed(2)}</td>
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => decrement(item.id)}
                            className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300 cursor-pointer text-gray-800"
                          >
                            -
                          </button>
                          <span className="w-8 text-center font-medium text-gray-800">{item.qty}</span>
                          <button
                            onClick={() => addToCart(item)}
                            className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300 cursor-pointer text-gray-800"
                          >
                            +
                          </button>
                        </div>
                      </td>
                      <td className="py-4 px-4 font-semibold text-gray-800">
                        ${(item.price * item.qty).toFixed(2)}
                      </td>
                      <td className="py-4 px-4 text-center">
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="text-red-500 hover:text-red-700 font-medium cursor-pointer"
                        >
                          <FaTimes size={20} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* CART SUMMARY */}
            <div className="mt-8 flex flex-col sm:flex-row justify-between items-center border-t pt-6">
              <button
                onClick={clearCart}
                className="text-red-600 border border-red-600 px-5 py-2 rounded-md hover:bg-red-600 hover:text-white transition mb-4 sm:mb-0 cursor-pointer"
              >
                Clear Cart
              </button>

              <div className="text-right">
                <h2 className="text-2xl font-bold text-gray-800">
                  Total: ${totalPrice.toFixed(2)}
                </h2>
                <button className="mt-3 bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-md transition cursor-pointer">
                  Checkout
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
