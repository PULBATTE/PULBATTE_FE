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
  backgroundColor: palette.pageBackgroundGray,
  scales: {
    x: {
      grid: {
        display: false,
      },
      ticks: {
        font: {
          size: 20,
        },
        color: palette.text.gray_3,
      },
    },
    y: {
      grid: {
        display: false,
      },
      max: 100,
    },
  },
  plugins: {
    legend: { display: false },
    title: {
      display: false,
      text: '식물 상태',
      font: {
        size: 20,
      },
    },
  },
};

// percentage = currentDdayClick / totalDdayClick;
const calculatePercent = (currentDday, totalDday) => {
  // 분모가 0이면 NAN

  if (totalDday === 0) return 0;
  const percent = (currentDday / totalDday) * 100;
  return percent;
};

export default function PlantInfoChart({ chartData }) {
  const [renderData, setRenderData] = useState();

  useEffect(() => {
    const chartDataToPercent = chartData.map(v => {
      return calculatePercent(v.currentDday, v.totalDday);
    });

    const data = {
      labels: ['물주기', '분갈이', '영양제'],
      datasets: [
        {
          backgroundColor: [
            palette.card.blue,
            palette.card.green,
            palette.card.brown,
          ],
          barThickness: 80,
          data: chartDataToPercent,
        },
      ],
    };
    setRenderData(data);
  }, [chartData]);

  return (
    <StChartWrapper>
      <h3>달성그래프</h3>
      <StChartContainer>
        {renderData && (
          <Bar height="320px" options={options} data={renderData} />
        )}
      </StChartContainer>
    </StChartWrapper>
  );
}
const StChartWrapper = styled.div`
  width: 100%;
  h3 {
    @media (max-width: 500px) {
      margin: 20px;
    }
  }
`;
const StChartContainer = styled.section`
  background-color: ${palette.pageBackgroundGray};
  padding: 20px;
  box-sizing: border-box;
  width: 100%;
  border-radius: 20px;
  height: 100%;
  max-height: 270px;

  @media (max-width: 500px) {
    width: 100%;
  }
`;
