"use client";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { FaOpencart, FaRegUser, FaBars } from "react-icons/fa6";
import { FaTimes } from "react-icons/fa";

import { IoHomeOutline } from "react-icons/io5";
import { LiaBoxOpenSolid } from "react-icons/lia";
import { useApp } from "@/context/AppContext";

export default function Navbar() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const { cart } = useApp();

  const cartCount = cart.reduce((sum, item) => sum + item.qty, 0);

  const navItems = [
    { name: "Home", href: "/", icon: <IoHomeOutline size={18} /> },
    { name: "Products", href: "/products", icon: <LiaBoxOpenSolid size={18} /> },
    { name: "Account", href: "/account", icon: <FaRegUser size={18} /> },
  ];

  return (
    <nav className="w-full bg-white/80 backdrop-blur-md shadow-sm py-3 px-6 flex justify-between items-center sticky top-0 z-50">
      {/* Logo */}
      <div className="flex items-center space-x-2">
        <Image
          src="/Bouguessa_Logomark.svg"
          alt="Logo"
          width={40}
          height={40}
          priority
        />
        <span className="font-semibold text-lg text-gray-800">Bouguessa</span>
      </div>

      {/* Desktop Nav */}
      <div className="hidden md:flex items-center space-x-6">
        {navItems.map((item) => (
          <Link
            key={item.name}
            href={item.href}
            className={`text-gray-700 text-xl p-2 rounded-lg transition-all duration-200 hover:text-blue-600 ${
              pathname === item.href ? "text-blue-600 bg-blue-50" : ""
            }`}
          >
            {item.icon}
          </Link>
        ))}

        <Link
        href="/cart"
          className={`relative text-gray-700 hover:text-blue-600 transition-colors ${
            pathname === "/cart" ? "text-blue-600" : ""
          }`}
        >
            <FaOpencart size={18} />
            {cartCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-semibold rounded-full px-1.5 py-0.5">
              {cartCount}
            </span>
          )}
        
        </Link>
      </div>

      {/* Mobile Menu Toggle */}
      <button
        className="md:hidden text-gray-700 hover:text-blue-600 transition-all duration-200"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        {menuOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
      </button>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="absolute top-16 left-0 w-full bg-white shadow-lg py-6 flex justify-center space-x-8 md:hidden animate-fade-in">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              onClick={() => setMenuOpen(false)}
              className={`text-gray-700 text-2xl p-2 rounded-md transition-all hover:text-blue-600 ${
                pathname === item.href ? "text-blue-600" : ""
              }`}
            >
              {item.icon}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}
