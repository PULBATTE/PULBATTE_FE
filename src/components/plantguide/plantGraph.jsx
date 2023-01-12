import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
);

export const options = {
  responsive: true,
  plugins: {
    title: {
      display: true,
      text: '식집사 가이드 식물 키우기',
    },
  },
};

const labels = [
  '2023-01-12',
  '2023-01-13',
  '2023-01-14',
  '2023-01-15',
  '2023-01-16',
  '2023-01-17',
  '2023-01-18',
];

export const data = {
  labels,
  datasets: [
    {
      label: '가이드라인 기준 ',
      data: [10, 23, 35, 43, 57, 57, 58],
      borderColor: 'rgb(255, 99, 132)',
      backgroundColor: 'rgba(255, 99, 132, 0.5)',
    },
    {
      label: '내 식물',
      data: [30, 45],
      borderColor: 'rgb(53, 162, 235)',
      backgroundColor: 'rgba(53, 162, 235, 0.5)',
    },
  ],
};

export default function PlantGraph() {
  return <Line options={options} data={data} />;
}
