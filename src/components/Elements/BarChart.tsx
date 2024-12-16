import { useRef } from 'react';
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
  ChartOptions,
  ChartArea,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface BarChartElementProps {
  title: string;
  data: number[];
  labels: string[];
}

const BarChartElement: React.FC<BarChartElementProps> = ({
  title,
  data,
  labels,
}) => {
  const chartRef = useRef(null);

  const getGradient = (ctx: CanvasRenderingContext2D, chartArea: ChartArea) => {
    const gradient = ctx.createLinearGradient(
      0,
      chartArea.bottom,
      0,
      chartArea.top
    );
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
            return 'rgba(54, 162, 235, 0.2)'; // Fallback color
          }
          return getGradient(ctx, chartArea) as CanvasGradient;
        },
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1,
      },
    ],
  };

  const options: ChartOptions<'bar'> = {
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
          weight: 'bold' as const,
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
          color: '#9CA3AF',
          font: { size: 12 },
        },
      },
      y: {
        grid: {
          color: '#E5E7EB',
          drawBorder: false,
        },
        beginAtZero: true,
        ticks: {
          color: '#9CA3AF',
          font: { size: 12 },
          callback: (value: number) => `${value / 1000000}M`,
        },
      },
    },
  };

  return (
    <div className='relative h-64'>
      <Bar ref={chartRef} data={chartData} options={options} />
    </div>
  );
};

export default BarChartElement;
