// eslint-disable-next-line import/no-unresolved
import { Bar } from 'react-chartjs-2';

import styled from 'styled-components';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';

const calculatedArr = [7, 2, 5];

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler,
);

export const options = {
  responsive: true,
  maintainAspectRatio: false,
  scales: {
    x: {
      grid: {
        display: false,
      },
    },
    y: {
      grid: {
        display: false,
      },
    },
  },
  plugins: {
    legend: { display: false },
    title: {
      display: true,
      text: '식물 상태',
    },
  },
};

const data = {
  labels: ['물주기', '분무량', '햇빛'],
  datasets: [
    {
      backgroundColor: '#fff',
      barThickness: 40,
      data: calculatedArr,
    },
  ],
};
export default function PlantInfoChart() {
  return (
    <StChartContainer>
      <Bar height="320px" options={options} data={data} />
    </StChartContainer>
  );
}

const StChartContainer = styled.div`
  background-color: lightgray;
  border-radius: 20px;
  margin-top: 50px;
  width: 560px;
  @media (max-width: 1120px) {
    width: 100%;
  }
`;
