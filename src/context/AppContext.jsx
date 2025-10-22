// "use client";

// import { createContext, useContext, useEffect, useState } from "react";

// const AppContext = createContext();

// export function AppProvider({ children }) {
//   const [cart, setCart] = useState(() => {
//     try {
//       const storeCart = localStorage.getItem("cart");
//       return storeCart ? JSON.parse(storeCart) : [];
//     } catch (err) {
//       console.log("Failed to load cart:", err);
//       return [];
//     }
//   });

//   useEffect(() => {
//     localStorage.setItem("cart", JSON.stringify(cart));
//   }, [cart]);

//   //Add to cart
//   const addToCart = (product) => {
//     if (!product || !product.id) return;

//     const existing = cart.find((item) => item.id === product.id);
//     if (existing) {
//       setCart(
//         cart.map((item) =>
//           item.id === product.id ? { ...item, qty: item.qty + 1 } : item
//         )
//       );
//     } else {
//       setCart([...cart, { ...product, qty: 1 }]);
//     }
//   };

//   //Decreasing item from cart
//   const decrement = (id) => {
//     setCart(
//       cart.map((item) =>
//         item.id === id
//           ? { ...item, qty: item.qty - 1 > 0 ? item.qty - 1 : 1 }
//           : item
//       )
//     );
//   };

//   //Remove from cart
//   const removeFromCart = (id) => {
//     setCart(cart.filter((item) => item.id !== id));
//   };

//   //Clear cart
//   const clearCart = () => setCart([]);

//   //Total price
//   const totalPrice = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

//   return (
//     <AppContext.Provider
//       value={{
//         cart,
//         setCart,
//         addToCart,
//         removeFromCart,
//         clearCart,
//         decrement,
//         totalPrice,
//       }}
//     >
//       {children}
//     </AppContext.Provider>
//   );
// }

// export function useApp() {
//   return useContext(AppContext);
// }


"use client";

import { createContext, useContext, useEffect, useState } from "react";

const AppContext = createContext();

export function AppProvider({ children }) {
  const [cart, setCart] = useState([]);
  const [isClient, setIsClient] = useState(false); // 👈 Track client mount

  useEffect(() => {
    setIsClient(true);
    try {
      const storeCart = localStorage.getItem("cart");
      if (storeCart) {
        setCart(JSON.parse(storeCart));
      }
    } catch (err) {
      console.log("Failed to load cart:", err);
    }
  }, []);

  useEffect(() => {
    if (isClient) {
      localStorage.setItem("cart", JSON.stringify(cart));
    }
  }, [cart, isClient]);

  const addToCart = (product) => {
    if (!product || !product.id) return;
    const existing = cart.find((item) => item.id === product.id);
    if (existing) {
      setCart(
        cart.map((item) =>
          item.id === product.id ? { ...item, qty: item.qty + 1 } : item
        )
      );
    } else {
      setCart([...cart, { ...product, qty: 1 }]);
    }
  };

  const decrement = (id) => {
    setCart(
      cart.map((item) =>
        item.id === id ? { ...item, qty: Math.max(item.qty - 1, 1) } : item
      )
    );
  };

  const removeFromCart = (id) => {
    setCart(cart.filter((item) => item.id !== id));
  };

  const clearCart = () => setCart([]);

  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  // ✅ Prevent SSR hydration mismatch
  if (!isClient) return null;

  return (
    <AppContext.Provider
      value={{
        cart,
        setCart,
        addToCart,
        removeFromCart,
        clearCart,
        decrement,
        totalPrice,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  return useContext(AppContext);
}
