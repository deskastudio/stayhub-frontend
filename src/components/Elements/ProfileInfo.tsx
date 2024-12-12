

const ProfileInfo: React.FC = () => {
  return (
    <div className='flex items-center space-x-4'>
      {/* Gambar profil di sebelah kanan */}
      <img src='/icon/notif-icon.svg' alt='Print Icon' className='w-6 h-6' />
      <img
        src='/profile.png'
        alt='Profil Admin'
        className='w-10 h-10 rounded-full'
      />
      {/* Teks untuk nama pengguna dan "Admin" */}
      <div className='flex flex-col'>
        <span className='text-lg font-semibold'>user-name</span>
        <span className='text-sm text-gray-600'>role</span>
      </div>
    </div>
  );
};

export default ProfileInfo;
