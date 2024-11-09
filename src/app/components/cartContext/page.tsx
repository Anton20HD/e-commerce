"use client";

// Good way to manage global state(especially where you need access to multiple components)
import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";

 export interface CartItem {
  _id: string;
  name: string;
  image: string;
  price: number;
  size: string;
  quantity: number;
}

// functions go here
interface CartContextType {
  cart: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (itemId: string, size: string) => void;
  calculateTotalPrice: (itemId: string, itemSize:string, itemPrice: number) => number;
  updateCartQuantity: (itemId: string, size:string, quantity: number) => void
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const ls = typeof window !== "undefined" ? window.localStorage : null;
  const [cart, setCart] = useState<CartItem[]>([]);

  useEffect(() => {
    if (cart?.length > 0) {
      ls?.setItem("cartItems", JSON.stringify(cart));
    }
  }, [cart, ls]);

  useEffect(() => {
    if (ls) {
      const storedCart = ls.getItem("cartItems");
      if (storedCart) {
        setCart(JSON.parse(storedCart));
      }
    }
  }, []);

  const addToCart = (item: CartItem) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find(
        (cartItem) => cartItem._id === item._id && cartItem.size === item.size
      );

      if (existingItem) {
        //update quantity if item is already in cart with same size
        return prevCart.map((cartItem) =>
          cartItem._id === item._id && cartItem.size === item.size
            ? { ...cartItem, quantity: cartItem.quantity + 1}
            : cartItem
        );
      } else {
        //add new item to cart
        return [...prevCart, {...item, quantity: 1}];
      }
    });
  };

  const removeFromCart = (itemId: string, size: string) => {
    setCart((prevCart) =>
      prevCart.filter(
        (cartItem) => !(cartItem._id === itemId && cartItem.size === size)
      )
    );
  };


  const updateCartQuantity = (itemId: string, size: string, quantity: number) => {
    setCart((prevCart) => 
    prevCart.map((cartItem) => 
      cartItem._id === itemId && cartItem.size === size
      ? {...cartItem, quantity: Math.max(0, cartItem.quantity + quantity) }
      : cartItem
    ).filter((cartItem) => cartItem.quantity > 0)
    );
  };

  const calculateTotalPrice = (itemId: string, itemSize:string, itemPrice:number) => {
    const totalQuantity = cart
    .filter(item => item._id === itemId && item.size === itemSize)
    .reduce((acc, item) => acc + item.quantity, 0);
    return totalQuantity * itemPrice; 
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, calculateTotalPrice, updateCartQuantity}}>
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
