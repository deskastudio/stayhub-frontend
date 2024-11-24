// src/components/elements/BarChartElement.tsx
import React, { useRef } from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartData,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

interface BarChartElementProps {
  title: string;
  data: number[];
  labels: string[];
}

const BarChartElement: React.FC<BarChartElementProps> = ({ title, data, labels }) => {
  const chartRef = useRef(null);

  // Setup gradien warna untuk batang chart
  const getGradient = (ctx: CanvasRenderingContext2D, chartArea: any) => {
    const gradient = ctx.createLinearGradient(0, chartArea.bottom, 0, chartArea.top);
    gradient.addColorStop(0, 'rgba(54, 162, 235, 0.2)');
    gradient.addColorStop(1, 'rgba(54, 162, 235, 0.8)');
    return gradient;
  };

  const chartData: ChartData<'bar'> = {
    labels,
    datasets: [
      {
        label: title,
        data,
        backgroundColor: (context) => {
          const chart = context.chart;
          const { ctx, chartArea } = chart;

          if (!chartArea) {
            return null; // Return default color if chartArea is not ready
          }
          return getGradient(ctx, chartArea);
        },
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: title,
        align: 'start' as const,
        font: {
          size: 16,
          weight: 'bold',
        },
        color: '#374151',
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        ticks: {
          color: '#9CA3AF', // Abu-abu terang
          font: {
            size: 12,
          },
        },
      },
      y: {
        grid: {
          color: '#E5E7EB', // Abu-abu terang untuk grid
          drawBorder: false,
        },
        beginAtZero: true,
        max: 3000000,
        ticks: {
          color: '#9CA3AF',
          font: {
            size: 12,
          },
          callback: (value: number) => `${value / 1000000}M`,
        },
      },
    },
  };

  return (
    <div className="relative h-64">
      <Bar ref={chartRef} data={chartData} options={options} />
    </div>
  );
};

export default BarChartElement;
