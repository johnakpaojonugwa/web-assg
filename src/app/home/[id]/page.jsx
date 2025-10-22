"use client";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useApp } from "@/context/AppContext";

export default function Page() {
  const { id } = useParams();
  const router = useRouter();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useApp();

  useEffect(() => {
    async function getProduct() {
      try {
        const res = await fetch(
          `https://api.escuelajs.co/api/v1/products/${id}`
        );
        if (!res.ok) throw new Error("Failed to fetch product");
        const data = await res.json();
        setProduct(data);
        console.log("Product fetched successfully:", data);
      } catch (err) {
        console.log("Error fetching product:", err);
      } finally {
        setLoading(false);
      }
    }
    if (id) getProduct();
  }, [id]);

  if (loading) {
    return <div className="text-center py-10">Loading...</div>;
  }

  if (!product) {
    return (
      <div className="w-11/12 mx-auto py-10 text-center">
        <h2>Product not found</h2>
        <Link href="/home" className="text-blue-500 underline">
          Go back to our product page
        </Link>
      </div>
    );
  }

  const handleAddAndGoToCart = () => {
    addToCart({
      id: product.id,
      title: product.title,
      price: product.price,
      image: product.images?.[0],
    });
    router.push("/cart");
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 w-9/12 mx-auto py-10 gap-10">
      <div>
        <Image
          src={product.images?.[0] || "/placeholder.png"}
          alt={product.title}
          width={500}
          height={500}
          unoptimized
          className="w-full object-cover rounded"
        />
      </div>

      <div className="p-10 space-y-4">
        <h1 className="text-2xl font-semibold">{product.title}</h1>
        <div className="items-center gap-10 flex ">
          <p className="font-bold text-lg text-gray-900">
            USD {product.price}.00
          </p>
          <span className="text-xs text-gray-500 uppercase">
            shipping calculated at checkout.
          </span>
        </div>
        <p className="text-sm text-gray-900 uppercase py-2">
          Color{" "}
          <span className="text-sm font-semibold text-gray-900 uppercase">
            Camel
          </span>
        </p>
        <div className="flex gap-3 mt-2">
          {product.images?.slice(0, 3).map((img, i) => (
            <Image
              key={i}
              src={img}
              alt={`${product.title}-${i}`}
              width={80}
              height={80}
              unoptimized
              className="object-cover w-20 h-20 rounded border cursor-pointer hover:scale-105 transition"
            />
          ))}
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={handleAddAndGoToCart}
            className="flex-1 bg-black text-white py-2 px-4 font-medium hover:bg-white hover:border hover:border-black hover:text-black transition rounded-md cursor-pointer"
          >
            Add to Cart
          </button>
        </div>

        <div className="border-b border-gray-200 pb-6">
          <p className="text-xs text-gray-900 mt-5 inline-block bg-gray-100 rounded py-2 px-2">
            #FA25BFJAJ033XS
          </p>
        </div>

        <div className="text-sm space-y-2 text-gray-600 border-b border-gray-200 pb-3">
          <p>✔ Free delivery and shipping over $700</p>
          <p>✔ Need help or advice? Call Us</p>
          <p>✔ WhatsApp +971 52 679 9878</p>
          <p>
            We offer custom sleeve and length adjustments* at no extra cost.
            Sleeves and lengths can be shortened as needed, or extended up to 1.
          </p>
        </div>
        <div>
          <h2 className="text-xl font-semibold my-3">Product details</h2>
          <p className="text-gray-500 italic leading-relaxed">
            {product.description}
          </p>
        </div>
      </div>
    </div>
  );
}
