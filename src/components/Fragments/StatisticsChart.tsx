// src/components/fragments/StatisticsCard.tsx
import React from 'react';
import BarChartElement from '../Elements/BarChart';

interface StatisticsCardProps {
    title: string;
    subtitle: string;
    data: number[];
    labels: string[];
    filterOptions: string[];
}

const StatisticsCard: React.FC<StatisticsCardProps> = ({ title, subtitle, data, labels, filterOptions }) => {
    return (
        <div className="p-4 bg-white border border-gray-200 rounded-lg shadow-md w-full">
            <div className="flex justify-between items-center mb-4">
                <div>
                    <div className="text-gray-500 text-sm">Statistics</div>
                    <div className="text-lg font-semibold text-gray-900">{title}</div>
                </div>
                <select className="text-gray-500 text-sm bg-transparent focus:outline-none">
                    {filterOptions.map((option) => (
                        <option key={option} value={option}>
                            {option}
                        </option>
                    ))}
                </select>
            </div>
            <BarChartElement title={subtitle} data={data} labels={labels} />
        </div>
    );
};

export default StatisticsCard;
