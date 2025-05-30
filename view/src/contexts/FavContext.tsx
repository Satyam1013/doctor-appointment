/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import React, { createContext, useContext, useEffect, useState } from 'react';
import {
  addToFavorite,
  getFavorites,
  removeFavoriteItem,
} from '../api/fav-api';

const FavoriteContext = createContext<any>(null);

export const FavoriteProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [favorites, setFavorites] = useState<string[]>([]);

  const fetchFavorites = async () => {
    try {
      const res = await getFavorites();
      const ids = res.data.map((item: any) => item.product._id);
      setFavorites(ids);
    } catch (err) {
      console.error('Failed to fetch favorites:', err);
    }
  };

  const toggleFavorite = async (productId: string) => {
    const isFav = favorites.includes(productId);

    try {
      if (isFav) {
        await removeFavoriteItem(productId);
        setFavorites((prev) => prev.filter((id) => id !== productId));
      } else {
        await addToFavorite(productId);
        setFavorites((prev) => [...prev, productId]);
      }
    } catch (err) {
      console.error('Failed to toggle favorite:', err);
    }
  };

  useEffect(() => {
    fetchFavorites();
  }, []);

  return (
    <FavoriteContext.Provider value={{ favorites, toggleFavorite }}>
      {children}
    </FavoriteContext.Provider>
  );
};

export const useFavorites = () => useContext(FavoriteContext);
