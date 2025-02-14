"use client";


// Good way to manage global state(especially where you need access to multiple components)
import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import { useSession } from "next-auth/react";

export interface CartItem {
  _id: string;
  name: string;
  image: string;
  price: number;
  size?: string;
  quantity: number;
}

// functions go here
interface CartContextType {
  cart: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (itemId: string, size: string) => void;
  calculateTotalPrice: (itemId: string, itemSize: string, itemPrice: number) => number;
  updateCartQuantity: (itemId: string, size: string, quantity: number) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const ls = typeof window !== "undefined" ? window.localStorage : null;
  const { data: session, status } = useSession();
  const [cart, setCart] = useState<CartItem[]>([]);
  const localStorageKey = "cartItems";

  const mergeCarts = (userCart: CartItem[], guestCart: CartItem[]) => {
    const mergedCart = [...userCart];
  
    guestCart.forEach((guestItem) => {
      const existingItem = mergedCart.find(
        (item) => item._id === guestItem._id && item.size === guestItem.size
      );
  
      if (existingItem) {
        existingItem.quantity += guestItem.quantity; // Add quantity
      } else {
        mergedCart.push(guestItem); // Add new item
      }
    });
  
    return mergedCart;
  };
  

  useEffect(() => {
    const fetchCart = async () => {
      if (status === "authenticated") {
        try {
          const response = await fetch("/api/cart", { method: "GET" });
          if (response.ok) {
            const data = await response.json();
            if (JSON.stringify(data.cart) !== JSON.stringify(cart)) {
              setCart(data.cart); // Overwrite instead of merging
            }
          } else {
            console.error("Failed to fetch cart:", response.status);
          }
        } catch (error) {
          console.error("Error fetching cart:", error);
        }
      } else if (status === "unauthenticated" && ls) {
        const storedCart = ls.getItem(localStorageKey);
        if (storedCart) {
          setCart(JSON.parse(storedCart));
        }
      }
    };

    if (status === "authenticated" || status === "unauthenticated") {
      fetchCart();
    }
  }, [status]);

  // Sync guest cart with localStorage
  useEffect(() => {
    if (status === "unauthenticated" && ls) {
      ls.setItem(localStorageKey, JSON.stringify(cart));
    }
  }, [cart, status]);

  const addToCart = (item: CartItem) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find(
        (cartItem) => cartItem._id === item._id && cartItem.size === item.size
      );

      let updatedCart;
      if (existingItem) {
        updatedCart = prevCart.map((cartItem) =>
          cartItem._id === item._id && cartItem.size === item.size
            ? { ...cartItem, quantity: Math.max(1, cartItem.quantity + 1) }
            : cartItem
        );
      } else {
        return [...prevCart, { ...item, quantity: 1 }];
      }


      // save guest cart to ls
      if(status === "unauthenticated" && ls) {
        ls.setItem(localStorageKey, JSON.stringify(updatedCart));
    }
      return updatedCart;
    });
  };

  const removeFromCart = (itemId: string, size: string) => {
    setCart((prevCart) => {
      const updatedCart = prevCart.filter(
        (cartItem) => !(cartItem._id === itemId && cartItem.size === size)
      );

       // save guest cart to ls
       if(status === "unauthenticated" && ls) {
        ls.setItem(localStorageKey, JSON.stringify(updatedCart));
    }
      return updatedCart;
    });
  };

  const updateCartQuantity = (itemId: string,size: string,quantity: number) => {
    setCart((prevCart) => {
      const updatedCart = prevCart
        .map((cartItem) =>
          cartItem._id === itemId && cartItem.size === size
            ? {
                ...cartItem,
                quantity: Math.max(1, cartItem.quantity + quantity),
              }
            : cartItem
        )
        .filter((cartItem) => cartItem.quantity > 0)

         // save guest cart to ls
      if(status === "unauthenticated" && ls) {
        ls.setItem(localStorageKey, JSON.stringify(updatedCart));
    }
      return updatedCart;
    });
  };

  const calculateTotalPrice = (
    itemId: string,
    itemSize: string | undefined,
    itemPrice: number
  ) => {
    const totalQuantity = cart
      .filter(
        (item) => item._id === itemId && (item.size === itemSize || item.size === "onesize")
      )
      .reduce((acc, item) => acc + item.quantity, 0);
    return totalQuantity * itemPrice;
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        calculateTotalPrice,
        updateCartQuantity,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error();
  }
  return context;
};
