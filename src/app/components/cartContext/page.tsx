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
  size: string;
  quantity: number;
}

// functions go here
interface CartContextType {
  cart: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (itemId: string, size: string) => void;
  calculateTotalPrice: (itemId: string, itemSize: string, itemPrice: number) => number;
  updateCartQuantity: (itemId: string, size: string, quantity: number) => void;
  syncCartWithBackend: () => Promise<void>;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const ls = typeof window !== "undefined" ? window.localStorage : null;
  const { data: session, status } = useSession();
  const [cart, setCart] = useState<CartItem[]>([]);
  const localStoragekey = "cartItems";

  useEffect(() => {
    const fetchCart = async () => {
      if (status === "authenticated") {
        try {
          const response = await fetch("/api/cart", { method: "GET" });
          if (response.ok) {
            const data = await response.json();
            //setCart(data.cart);
            //syncCartWithBackend();
            if(JSON.stringify(data.cart) !== JSON.stringify(cart))
            setCart((prevCart) => {
              const mergedCart = [...prevCart];
              data.cart.forEach((item: CartItem) => {
                const existingItem = mergedCart.find(
                  (cartItem) => cartItem._id === item._id && cartItem.size === item.size
                );
                if (existingItem) {
                    // update quantity if item exist in cart
                  existingItem.quantity += item.quantity;
                } else {

                  mergedCart.push(item);
                }
              });
              return mergedCart;
            });
          } else {
            console.error("Failed to fetch cart from backend:",response.status );
          }
        } catch (error) {
          console.error("Failed to fetch cart from backend:", error);
        }
      } else if (ls) {
        const storedCart = ls.getItem(localStoragekey);
        if (storedCart) {
          setCart(JSON.parse(storedCart));
        }
      }
    };

    if (status === "authenticated" || status === "unauthenticated") {
    fetchCart();
    }
  }, [status]);

  // sync after cart is updated
  useEffect(() => {
    if (status === "unauthenticated" && ls) {
      const storedCart = ls.getItem(localStoragekey);
      if (storedCart !== JSON.stringify(cart)) {
        ls.setItem(localStoragekey, JSON.stringify(cart));
      }
    }
  }, [cart, status, ls]);

 

  // Automatically sync with backend with useeffect and we dont need to call the method in every function
  useEffect(() => {
    let isSyncing = false;


    const syncCartWithBackend = async () => {
      if (status === "authenticated" && session?.user?.id && !isSyncing) {
        isSyncing = true;
        try {
          const response = await fetch("/api/cart", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ userId: session.user.id, cartItems: cart }),
          });

          if (!response.ok) {
            console.error("Failed to sync cart with backend:", response.status);
          }
        } catch (error) {
          console.error("Error syncing cart:", error);
        } finally {
          isSyncing = false;
        }
      }
    };

    if(status === "authenticated") {
      syncCartWithBackend();
    }
  }, [cart, status, session]);

  const addToCart = (item: CartItem) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find(
        (cartItem) => cartItem._id === item._id && cartItem.size === item.size
      );

      if (existingItem) {
        //update quantity if item is already in cart with same size
        return prevCart.map((cartItem) =>
          cartItem._id === item._id && cartItem.size === item.size
            ? { ...cartItem, quantity: Math.max(1,cartItem.quantity + 1) } // prevent quantity being below 1
            : cartItem
        );
      } else {
        //add new item to cart
        return [...prevCart, { ...item, quantity: 1 }];
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

  const updateCartQuantity = (
    itemId: string,
    size: string,
    quantity: number
  ) => {
    setCart((prevCart) =>
      prevCart
        .map((cartItem) =>
          cartItem._id === itemId && cartItem.size === size
            ? {
                ...cartItem,
                quantity: Math.max(0, cartItem.quantity + quantity),
              }
            : cartItem
        )
        .filter((cartItem) => cartItem.quantity > 0)
    );
  };

  const calculateTotalPrice = (
    itemId: string,
    itemSize: string,
    itemPrice: number
  ) => {
    const totalQuantity = cart
      .filter((item) => item._id === itemId && item.size === itemSize)
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
        syncCartWithBackend: async () => {},
      }}
    >
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
