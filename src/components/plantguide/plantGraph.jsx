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
  /* plugins: {
    title: {
      display: true,
      text: '식집사 가이드 식물 키우기',
    },
  }, */
};

export default function PlantGraph({ graph }) {
  const labels = [];
  const lists = [];
  graph.map(data => {
    lists.push(data.graphValue);
    return labels.push(data.localDate);
  });
  const data = {
    labels,
    datasets: [
      /* {
        label: '가이드라인 기준 ',
        data: [10, 23, 35, 43, 57, 57, 58],
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      }, */
      {
        label: '내 식물',
        data: lists,
        borderColor: 'rgb(53, 162, 235)',
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
    ],
  };
  return <Line options={options} data={data} />;
}
