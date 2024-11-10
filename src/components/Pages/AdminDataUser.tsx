import React, { useState } from 'react';
import { IoMdNotificationsOutline } from 'react-icons/io';
import { FiEye } from "react-icons/fi";
import Button from '../Elements/Button';
import dataUser from '../../json/dataUser.json';
import { MdDeleteOutline, MdModeEdit } from 'react-icons/md';

const DataUser: React.FC = () => {
    // state menyimpan role yang aktif
    const [activeRole, setActiveRole] = useState<string>('member');

    // filter data user
    const filterDataUser = (role: string) => {
        return dataUser.filter((user) => user.role.toLowerCase() === role);
    }

    // handler untuk mengubah role aktif
    const handleActiveRole = (role: string) => {
        setActiveRole(role);
    }

    return (
        <div className='p-10 flex flex-col gap-10'>
            <div className='flex justify-between items-center'>
                <h1 className='font-[poppins] text-4xl font-bold text-primary-textDark'>Fasilitas Kos</h1>
                <div className='flex items-center gap-4'>
                    <IoMdNotificationsOutline size={32} />
                    <div className='w-10 h-10'>
                        <img src="/profile.png" alt="" />
                    </div>
                    <div>
                        <h1 className='text-lg font-semibold text-primary-textDark'>Subhan Hakim</h1>
                        <h1 className='text-sm text-primary-textLight'>Admin</h1>
                    </div>
                </div>
            </div>
            <div className='flex gap-4'>
                <Button type='button' variant={activeRole === 'member' ? 'primary' : 'tertiary'} onClick={() => {handleActiveRole("member") }}>Member</Button>
                <Button type='button' variant={activeRole === 'admin' ? 'primary' : 'tertiary'} onClick={() => {handleActiveRole("admin") }}>Admin</Button>
            </div>
            <div className='flex justify-between items-center'>
                <div>
                    <h2 className='text-2xl font-bold text-primary-textDark'>Member</h2>
                </div>
                <div>
                    <Button type='button' variant='primary' onClick={() => { }}>Tambah Fasilitas</Button>
                </div>
            </div>
            <div className='bg-white p-5 rounded-md'>
                <div className="relative overflow-x-auto">
                    <table className="w-full text-sm text-center rtl:text-right text-gray-500 dark:text-gray-400">
                        <thead className="text-xs text-gray-700 uppercase dark:bg-primary-dark dark:text-white">
                            <tr>
                                <th scope="col" className="p-5">
                                    Foto
                                </th>
                                <th scope="col" className="p-5">
                                    Nama
                                </th>
                                <th scope="col" className="p-5">
                                    No HP
                                </th>
                                <th scope="col" className="p-5">
                                    Email
                                </th>
                                <th scope="col" className="p-5">
                                    Status
                                </th>
                                <th scope="col" className="p-5">
                                    Aksi
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {filterDataUser(activeRole).map((item) => (
                                <tr key={item.id} className="dark:bg-white text-primary-textDark">
                                    <td className="p-5">{item.image}</td>
                                    <td className="p-5">{item.username}</td>
                                    <td className="p-5">{item.nohp}</td>
                                    <td className="p-5">{item.email}</td>
                                    <td className="p-5">{item.status}</td>
                                    <td className="p-5 flex align-middle items-center justify-center gap-4">
                                        <tr>
                                            <FiEye size={24} color='blue' />
                                        </tr>
                                        <tr>
                                            <MdModeEdit size={24} color='blue' />
                                        </tr>
                                        <tr>
                                            <MdDeleteOutline size={24} color='blue' />
                                        </tr>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default DataUser;
