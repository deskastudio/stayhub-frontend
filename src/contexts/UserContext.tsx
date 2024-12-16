import React, { createContext, useState, ReactNode } from 'react';

interface UserContextProps {
  children: ReactNode;
}

export interface UserContextType {
  userType: string;
  setUserType: React.Dispatch<React.SetStateAction<string>>;
}

export const UserContext = createContext<UserContextType | undefined>(
  undefined
);

export const UserProvider: React.FC<UserContextProps> = ({ children }) => {
  const [userType, setUserType] = useState<string>('user');

  return (
    <UserContext.Provider value={{ userType, setUserType }}>
      {children}
    </UserContext.Provider>
  );
};
