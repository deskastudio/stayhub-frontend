import React from "react";

const ProfileInfo: React.FC = () => (
  <div className="flex items-center space-x-4">
    {/* Gambar profil di sebelah kanan */}
    <img src="/icon/notif-icon.svg" alt="Print Icon" className="w-6 h-6" />
    <img src="/profile.png" alt="Profil Admin" className="w-10 h-10 rounded-full" />
    {/* Teks untuk nama pengguna dan "Admin" */}
    <div className="flex flex-col">
      <span className="text-lg font-semibold">John Doe</span>
      <span className="text-sm text-gray-600">Admin</span>
    </div>
  </div>
);

export default ProfileInfo;
