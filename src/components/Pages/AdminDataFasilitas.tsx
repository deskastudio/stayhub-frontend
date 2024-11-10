import React from 'react';
import { IoMdNotificationsOutline } from 'react-icons/io';
import { FiEye } from "react-icons/fi";
import Button from '../Elements/Button';
import dataFasilitas from '../../json/dataFasilitas.json';
import { MdDeleteOutline, MdModeEdit } from 'react-icons/md';

const DataFasilitas: React.FC = () => {
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
            <div className='flex justify-between items-center'>
                <div>

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
                                    Id
                                </th>
                                <th scope="col" className="p-5">
                                    Fasilitas
                                </th>
                                <th scope="col" className="p-5">
                                    Jumlah
                                </th>
                                <th scope="col" className="p-5">
                                    Dipakai
                                </th>
                                <th scope="col" className="p-5">
                                    Gambar
                                </th>
                                <th scope="col" className="p-5">
                                    Aksi
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {dataFasilitas.map((item) => (
                                <tr key={item.id} className="dark:bg-white text-primary-textDark">
                                    <th scope="row" className="p-5 font-medium text-gray-900 whitespace-nowrap">
                                        {item.id}
                                    </th>
                                    <td className="p-5">{item.fasilitas}</td>
                                    <td className="p-5">{item.jumlah}</td>
                                    <td className="p-5">{item.dipakai}</td>
                                    <td className="p-5">{item.image}</td>
                                    <td className="p-5 flex align-middle items-center justify-center gap-4">
                                        <tr>
                                            <FiEye size={24} color='blue'/>
                                        </tr>
                                        <tr>
                                            <MdModeEdit size={24} color='blue'/>
                                        </tr>
                                        <tr>
                                            <MdDeleteOutline size={24} color='blue'/>
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

export default DataFasilitas;
