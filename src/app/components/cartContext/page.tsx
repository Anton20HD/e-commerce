"use client";


// Good way to manage global state(especially where you need access to multiple components)
import React, { createContext, useContext, useState, ReactNode } from "react";

interface CartItem {
  _id: string;
  name: string;
  price: number;
  size: string;
  quantity: number;
}

// functions go here
interface CartContextType {
  cart: CartItem[];
  addToCart: (item: CartItem) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>([]);

  const addToCart = (item: CartItem) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find(
        (cartItem) => cartItem._id === item._id && cartItem.size === item.size
      );

      if (existingItem) {
        //update quantity if item is already in cart with same size
        return prevCart.map((cartItem) =>
          cartItem._id === item._id && cartItem.size === item.size
            ? { ...cartItem, quantity: cartItem.quantity + item.quantity }
            : cartItem
        );
      } else {
        //add new item to cart
        return [...prevCart, item];
      }
    });
  };

  return (
    <CartContext.Provider value={{ cart, addToCart }}>
      {children}
    </CartContext.Provider>
  );
};

//Function to use the cart
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error();
  }
  return context;
};
