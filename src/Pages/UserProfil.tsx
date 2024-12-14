import SectionHeader from '../components/Elements/SectionHeader';
import Profile from '../components/Fragments/Profile';
import Button from '../components/Elements/Button';
import axios from 'axios';
import { useState, useEffect, FormEvent } from 'react';

interface User {
  id: number;
  fullName: string;
  email: string;
  phone: number;
  address: string;
  profileImage?: string;
  ktpImages?: string;
}

const UserProfil: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [fullName, setFullName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [address, setAddress] = useState<string>('');
  const [profileImage, setProfileImage] = useState<File | null>(null);
  const [ktpImages, setKtpImages] = useState<File | null>(null);

  const token = sessionStorage.getItem('token');

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get('http://localhost:8000/user/profile', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        });
        const data = response.data.data;
        setUser(data);
        setFullName(data.fullName);
        setEmail(data.email);
        setPhone(data.phone);
        setAddress(data.address);
      } catch (error) {
        console.error('Error fetching user data:', error);
        setError('Gagal memuat data pengguna.');
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [token]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!fullName || !email) {
      alert('Nama lengkap dan email harus diisi!');
      return;
    }

    const formData = new FormData();
    formData.append('fullName', fullName);
    formData.append('email', email);
    formData.append('phone', phone || '');
    formData.append('address', address || '');
    if (profileImage) {
      formData.append('profileImage', profileImage);
    }
    if (ktpImages) {
      formData.append('ktpImages', ktpImages);
    }

    try {
      const response = await axios.put(
        'http://localhost:8000/user/profile/update',
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        }
      );

      if (response.status === 200) {
        alert('Profil berhasil diperbarui!');
        setUser((prev) => ({
          ...prev!,
          fullName,
          email,
          phone: Number(phone),
          address,
          profileImage: profileImage
            ? URL.createObjectURL(profileImage)
            : prev?.profileImage,
          ktpImages: ktpImages
            ? URL.createObjectURL(ktpImages)
            : prev?.ktpImages,
        }));
      } else {
        alert('Gagal memperbarui profil.');
      }
    } catch (error) {
      console.error('Error memperbarui profil:', error);
      alert('Terjadi kesalahan saat memperbarui profil.');
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className='p-8 flex-grow'>
      <SectionHeader title='Profile Saya'>
        <Profile />
      </SectionHeader>

      <div className='overflow-x-auto w-full'>
        <div className='bg-white py-9 px-16 rounded-lg mt-6'>
          <h2 className='text-xl font-bold'>Profil Pengguna</h2>
          <form className='mt-5' onSubmit={handleSubmit}>
            <div className='flex items-center gap-5 mb-5'>
              <img
                src={user?.profileImage || 'profile.png'}
                alt='Profile'
                className='w-20 h-20 rounded-full'
              />
              <div className='bg-primary rounded-lg'>
                <input
                  type='file'
                  id='choose-photo'
                  className='hidden'
                  onChange={(e) =>
                    setProfileImage(e.target.files ? e.target.files[0] : null)
                  }
                />
                <label
                  htmlFor='choose-photo'
                  className='cursor-pointer text-white font-medium py-2 px-4 block'
                >
                  Pilih Foto
                </label>
              </div>
            </div>
            <div className='grid grid-cols-2 gap-5'>
              <div>
                <label className='block mb-2 font-medium'>Nama Lengkap</label>
                <input
                  type='text'
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder='Masukan nama lengkap'
                  className='w-full p-3 border rounded-lg'
                  required
                />
              </div>
              <div>
                <label className='block mb-2 font-medium'>No Telepon</label>
                <input
                  type='text'
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder='Masukan no telepon'
                  className='w-full p-3 border rounded-lg'
                />
              </div>
              <div>
                <label className='block mb-2 font-medium'>Email</label>
                <input
                  type='email'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder='Masukan email'
                  className='w-full p-3 border rounded-lg'
                  required
                />
              </div>
              <div>
                <label className='block mb-2 font-medium'>Alamat</label>
                <textarea
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder='Masukan alamat'
                  className='w-full p-3 border rounded-lg resize-none'
                  required
                ></textarea>
              </div>
            </div>
            <div className='mt-5'>
              <label className='block mb-3 font-medium'>Foto KTP</label>
              <input
                type='file'
                id='ktp-upload'
                onChange={(e) =>
                  setKtpImages(e.target.files ? e.target.files[0] : null)
                }
                className='w-full'
              />
            </div>
            <div className='mt-4'>
              <Button type='submit' variant='primary'>
                Simpan Perubahan
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UserProfil;
