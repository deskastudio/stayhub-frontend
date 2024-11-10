import React, { createContext, useState } from 'react';

interface UserContextType {
  userType: 'admin' | 'user' | null;
  setUserType: (type: 'admin' | 'user' | null) => void;
}

export const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [userType, setUserType] = useState<'admin' | 'user' | null>(null);

  return (
    <UserContext.Provider value={{ userType, setUserType }}>
      {children}
    </UserContext.Provider>
  );
}; 