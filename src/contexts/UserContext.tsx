// contexts/UserContext.tsx
import React, { createContext, useState, useEffect, useContext } from 'react';

interface UserContextType {
  userType: 'admin' | 'user' | null;
  setUserType: (type: 'admin' | 'user' | null) => void;
}

// Membuat konteks dengan tipe default undefined
export const UserContext = createContext<UserContextType | undefined>(undefined);

// Hook custom untuk menggunakan UserContext dengan aman
export const useUser = (): UserContextType => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [userType, setUserType] = useState<'admin' | 'user' | null>(null);

  // Memuat role dari sessionStorage ketika aplikasi dimulai
  useEffect(() => {
    const role = sessionStorage.getItem('role');
    if (role === 'admin' || role === 'user') {
      setUserType(role);
    }
  }, []);

  return (
    <UserContext.Provider value={{ userType, setUserType }}>
      {children}
    </UserContext.Provider>
  );
};
