"use client";

import Link from "next/link";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { LiaSpinnerSolid } from "react-icons/lia";

function Page() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch("https://api.escuelajs.co/api/v1/products");
        const data = await res.json();
        setProducts(data.slice(0, 24));
        console.log("Product data:", data.slice(0, 24));
      } catch (error) {
        console.log("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <LiaSpinnerSolid size={40} className="animate-spin text-blue-500" />
      </div>
    );
  }

  return (
    <div className="relative w-full min-h-screen">
      {/*HERO SECTION */}
      <section className="relative h-[90vh] w-full overflow-hidden flex items-center justify-center">
        {/* Background image */}
        <div className="absolute inset-0">
          <Image
            src="/landing.jpg"
            alt="Background"
            fill
            priority
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black/50" />{" "}
          {/* overlay for contrast */}
        </div>

        {/* Hero text */}
        <div className="relative z-10 text-center text-white max-w-xl px-8 md:px-16">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4 drop-shadow-lg">
            Welcome to Our Store
          </h1>
          <p className="text-lg md:text-xl mb-6 text-gray-200">
            Discover premium products and exclusive deals made just for you.
          </p>
          <Link
            href="#products"
            className="bg-amber-600 text-white px-6 py-3 rounded-full font-semibold hover:bg-gray-200 hover:text-black transition"
          >
            Shop Now
          </Link>
        </div>
      </section>

      {/*PRODUCTS SECTION */}
      <section id="products" className="bg-white/90 py-10">
        <div className="w-9/12 mx-auto">
          <h2 className="text-3xl font-bold my-4 text-center text-gray-900">
            Products
          </h2>

          {products.length === 0 ? (
            <p className="text-gray-500 text-center">No products found.</p>
          ) : (
            <div className="flex flex-wrap gap-6 justify-center cursor-pointer">
              {products.map((product) => (
                <Link
                  href={`/home/${product.id}`}
                  key={product.id}
                  className="flex-grow basis-[250px] max-w-[300px]"
                >
                  <div className="border border-gray-100 p-4 rounded-lg shadow-lg hover:shadow-xl transition flex flex-col bg-white">
                    <Image
                      src={product.images?.[0]}
                      alt={product.title || "Product image"}
                      width={300}
                      height={300}
                      unoptimized
                      className="w-full h-[250px] transition duration-300 object-cover mb-4"
                    />
                    <div className="flex flex-col gap-1 flex-grow">
                      <h2 className="font-bold truncate text-sm text-gray-900 uppercase">
                        {product.title}
                      </h2>
                      <p className="font-semibold text-sm text-blue-900 flex justify-end">
                        ${product.price}
                        <span>.00</span>
                      </p>
                      <p className="text-xs font-medium text-gray-500 truncate">
                        {product.description}
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

export default Page;
