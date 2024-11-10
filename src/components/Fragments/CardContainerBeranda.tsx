// src/components/fragments/CardContainerBeranda.tsx
import React from 'react';

interface CardProps {
    title: string;
    count: number;
    icon: string;
}

const Card: React.FC<CardProps> = ({ title, count, icon }) => (
    <div className="flex flex-col items-start p-4 border border-gray-200 rounded-lg shadow-md bg-white w-full">
        <img src={icon} alt={title} className="w-8 h-8 mb-2" />
        <div className="text-gray-600 text-sm font-medium">{title}</div>
        <div className="text-gray-900 text-2xl font-semibold">{count}</div>
    </div>
);

const CardContainerBeranda: React.FC = () => {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card title="Total Penghuni" count={120} icon="../public/icon/totalPenghuni_icon.svg" />
            <Card title="Total Kamar" count={120} icon="../public/icon/totalKamar_icon.svg" />
            <Card title="Total Penghuni" count={120} icon="../public/icon/totalKamar_icon.svg" />
        </div>
    );
};

export default CardContainerBeranda;
