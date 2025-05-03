/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import React, { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { AuthContext } from './AuthContext'; // adjust path as needed

// Define user type (match your backend User model)
export interface User {
  _id: string;
  firstName: string;
  email: string;
  // add other fields if needed
}

interface UserContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  isLoading: boolean;
}

// Create context
const UserContext = createContext<UserContextType | undefined>(undefined);

// Provider component
export const UserProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { token } = useContext(AuthContext);
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      if (!token) {
        // No token = no API call
        setUser(null);
        setIsLoading(false);
        return;
      }

      try {
        const res = await axios.get(
          'https://doctor-appointment-5j6e.onrender.com/users/details',
          {
            headers: { Authorization: `Bearer ${token}` },
          },
        );
        setUser(res.data);
      } catch (err) {
        console.error('Error fetching current user', err);
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUser();
  }, [token]); // 🔥 Rerun when token changes

  return (
    <UserContext.Provider value={{ user, setUser, isLoading }}>
      {children}
    </UserContext.Provider>
  );
};

// Hook to use UserContext easily
export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used inside UserProvider');
  }
  return context;
};
