import React, { createContext, useContext, useState, ReactNode } from 'react';

type CartContextType = {
  totalAmount: number;
  setTotalAmount: (amount: number) => void;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [totalAmount, setTotalAmount] = useState(0);

  return (
    <CartContext.Provider value={{ totalAmount, setTotalAmount }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart must be used within a CartProvider');
  return context;
};
