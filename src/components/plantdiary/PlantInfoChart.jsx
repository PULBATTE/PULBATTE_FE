import { useState, useEffect } from 'react';
// eslint-disable-next-line import/no-unresolved
import { Bar } from 'react-chartjs-2';

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
import styled from 'styled-components';
import { palette } from '../../styles/palette';

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

const MOCK_DATA = {
  labels: ['물주기', '분무량', '햇빛'],
  datasets: [
    {
      backgroundColor: [
        palette.card.blue,
        palette.card.green,
        palette.card.brown,
      ],
      barThickness: 40,
      data: calculatedArr,
    },
  ],
};

export default function PlantInfoChart({ chartData }) {
  const [renderData, setRenderData] = useState();
  const calculateBarChartArr = v => {
    console.log(Object.values(v));
  };
  useEffect(() => {
    // const calculatedArr =
    const data = {
      labels: ['물주기', '분무량', '햇빛'],
      datasets: [
        {
          backgroundColor: [
            palette.card.blue,
            palette.card.green,
            palette.card.brown,
          ],
          barThickness: 40,
          data: calculatedArr,
        },
      ],
    };
    setRenderData();
  }, []);
  return (
    <StChartContainer>
      <Bar height="320px" options={options} data={MOCK_DATA} />
    </StChartContainer>
  );
}

const StChartContainer = styled.div`
  background-color: ${palette.pageBackgroundGray};
  padding: 20px;
  border-radius: 20px;
  margin-top: 50px;
  width: 560px;
  @media (max-width: 1120px) {
    width: 100%;
  }
`;
