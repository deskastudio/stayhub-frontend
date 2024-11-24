import React from 'react';
import { useUser } from '../../hooks/useUser';

const SwitchUserType: React.FC = () => {
  const { userType, setUserType } = useUser(); // Ambil userType dan setUserType dari context

  const toggleUserType = () => {
    setUserType(userType === 'admin' ? 'user' : 'admin'); // Beralih antara admin dan user
  };

  return (
    <div className="mb-4">
      <button
        onClick={toggleUserType}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
      >
        Switch to {userType === 'admin' ? 'User' : 'Admin'} Mode
      </button>
    </div>
  );
};

export default SwitchUserType;
