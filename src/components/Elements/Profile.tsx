import React from 'react';

interface ProfileInfoProps {
  name: string;
  role: string;
  profileImage: string;
}

const ProfileInfo: React.FC<ProfileInfoProps> = ({
  name,
  role,
  profileImage,
}) => (
  <div className='flex items-center space-x-4'>
    {/* Gambar profil di sebelah kanan */}
    <img src='/icon/notif-icon.svg' alt='Notif Icon' className='w-6 h-6' />
    <img src={profileImage} alt='Profile' className='w-10 h-10 rounded-full' />
    {/* Teks untuk nama pengguna dan "role" */}
    <div className='flex flex-col'>
      <span className='text-lg font-semibold'>{name}</span>
      <span className='text-sm text-gray-600'>{role}</span>
    </div>
  </div>
);

export default ProfileInfo;
