// src/components/fragments/CardContainerBeranda.tsx
import axios from 'axios';
import { useEffect, useState } from 'react';

interface CardProps {
  title: string;
  count: number;
  icon: string;
}

interface User {
  id: number;
  role: string;
}

interface Transaction{
  id: number;
  status: string;
  cost: number;
}



const Card: React.FC<CardProps> = ({ title, count, icon }) => (
  <div className="flex flex-col items-start p-4 border border-gray-200 rounded-lg shadow-md bg-white w-full">
    <img src={icon} alt={title} className="w-8 h-8 mb-2" />
    <div className="text-gray-600 text-sm font-medium">{title}</div>
    <div className="text-gray-900 text-2xl font-semibold">{count}</div>
  </div>
);

const CardContainerBeranda: React.FC = () => {
  const [totalUsers, setTotalUsers] = useState<number>(0);
  const [totalRooms, setTotalRooms] = useState<number>(0);
  const [totalFacilities, setTotalFacilities] = useState<number>(0);
  const [totalNotPaid, setTotalNotPaid] = useState<number>(0);
  const [income, setIncome] = useState<number>(0);

  const token = sessionStorage.getItem('token');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [usersResponse, roomsResponse, facilityResponse, transactionResponse] = await Promise.all([
          axios.get('http://localhost:8000/list/user', {
            headers: { Authorization: `Bearer ${token}` },
            withCredentials: true,
          }),
          axios.get('http://localhost:8000/room', {
            headers: { Authorization: `Bearer ${token}` },
            withCredentials: true,
          }),
          axios.get('http://localhost:8000/facility', {
            headers: { Authorization: `Bearer ${token}` },
            withCredentials: true
          }),
          axios.get('http://localhost:8000/transaction/get', {
            headers: { Authorization: `Bearer ${token}` },
            withCredentials: true
          })
        ]);

        // Memproses data users untuk role "user"
        const users = usersResponse.data.data.filter((user: User) => user.role === 'user');
        setTotalUsers(users.length);

        // Memproses data rooms
        const rooms = roomsResponse.data.data;
        setTotalRooms(rooms.length);

        // Memproses data facilities
        const facilities = facilityResponse.data.data;
        setTotalFacilities(facilities.length);

        // Memproses data transaction untuk status "belum bayar"
        const transactions = transactionResponse.data.data;
        console.log("transactions", transactions);
        const notPaid = transactions.filter((transaction: Transaction ) => transaction.status === 'pending');
        setTotalNotPaid(notPaid.length);

        // Memproses data total income
        const income = transactions.reduce((acc: number, transaction: Transaction) => {
          if (transaction.status === 'paid') {
            return acc + transaction.cost;
          }
          return acc;
        }, 0);
        setIncome(income);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      <Card title="Total Penghuni" count={totalUsers} icon="../public/icon/totalPenghuni_icon.svg" />
      <Card title="Total Kamar" count={totalRooms} icon="../public/icon/totalKamar_icon.svg" />
      <Card title="Total Fasilitas" count={totalFacilities} icon="../public/icon/totalKamar_icon.svg" />
      <Card title="Total Pendapatan" count={income} icon="../public/icon/totalKamar_icon.svg" />
      <Card title="Total Belum Bayar" count={totalNotPaid} icon="../public/icon/totalKamar_icon.svg" />
      <Card title="Total Sudah Bayar" count={totalFacilities} icon="../public/icon/totalKamar_icon.svg" />
    </div>
  );
};

export default CardContainerBeranda;
