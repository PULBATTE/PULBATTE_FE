import { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import { Calendar } from 'react-calendar';
import { format } from 'date-fns';
import { palette } from '../../styles/palette';
import { getCalendarDataApi } from '../../apis/plantDiary';

export default function PlantDiaryCalendar({ plantJournalId }) {
  const [diaryValue, setDiaryValue] = useState();
  console.log(diaryValue);

  const getCalendar = useCallback(async () => {
    const data = await getCalendarDataApi(plantJournalId);
    setDiaryValue(data.data);
  }, [plantJournalId]);

  const doneActionColorArr = date => {
    const formatDate = format(date, 'yyyy-MM-dd');
    const colorArr = [];

    diaryValue &&
      diaryValue.map(v => {
        if (formatDate === v.localDate) {
          if (v.water) {
            colorArr.push(palette.card.blue);
          }
          if (v.repot) {
            colorArr.push(palette.card.brown);
          }
          if (v.nutrition) {
            colorArr.push(palette.card.green);
          }
        }
      });
    return colorArr;
  };

  useEffect(() => {
    getCalendar();
  }, [getCalendar]);

  const renderColorChips = e => {
    const colorArr = doneActionColorArr(e.date);

    return (
      <StStatusColorChipContainer>
        {colorArr.length !== 0 &&
          colorArr.map(v => {
            return <StStatusColorChip key={`${v}_colorChip`} background={v} />;
          })}
      </StStatusColorChipContainer>
    );
  };

  return (
    <StInjection>
      <div className="calendar-container">
        <Calendar
          tileContent={renderColorChips} // titleContent옵션은 날짜에 테그를 추가 할 수 있음
          onClickDay={date => {
            console.log(format(date, 'yyyy-MM-dd'));
          }}
          locale="en-EN"
        />
      </div>
    </StInjection>
  );
}

const StInjection = styled.div`
  text-decoration: none;
  button {
    position: relative;
    border: none;
    padding: 10px;
  }
  & .react-calendar {
    /* width: 400px; */
    max-width: 100%;
    background-color: #fff;
    color: #222;
    border-radius: 8px;
    box-shadow: 0 12px 24px rgba(0, 0, 0, 0.2);
    font-family: Arial, Helvetica, sans-serif;
    line-height: 1.125em;
    padding: 40px 28px;
  }
  /* 달력 헤더 */
  & .react-calendar__navigation {
    margin-bottom: 24px;
  }
  & .react-calendar__navigation button {
    color: ${palette.mainColor};
    min-width: 44px;
    background: none;
    font-size: 20px;
    font-weight: bold;
    margin-top: 8px;
  }
  & .react-calendar__navigation button:enabled:hover,
  & .react-calendar__navigation button:enabled:focus {
    background-color: #f8f8fa;
  }
  & .react-calendar__navigation button[disabled] {
    background-color: #f0f0f0;
  }
  abbr[title] {
    text-decoration: none;
  }

  & .react-calendar__tile:enabled:hover,
  & .react-calendar__tile:enabled:focus {
    background: #f8f8fa;
    color: #6f48eb;
    border-radius: 6px;
  }
  & .react-calendar__tile--now {
    background: ${palette.mainColor};
    border-radius: 6px;
    font-weight: bold;
    color: ${palette.white};
    opacity: 80%;
  }
  & .react-calendar__tile--now:enabled:hover,
  & .react-calendar__tile--now:enabled:focus {
    background: ${palette.mainColor};
    border-radius: 6px;
    font-weight: bold;
    color: ${palette.white};
    opacity: 80%;
  }
  & .react-calendar__tile--hasActive:enabled:hover,
  & .react-calendar__tile--hasActive:enabled:focus {
    background: #f8f8fa;
  }
  & .react-calendar__tile--active {
    /* background: #6f48eb;
    border-radius: 6px;
    font-weight: bold;
    color: white; */
  }
  & .react-calendar__tile--active:enabled:hover,
  & .react-calendar__tile--active:enabled:focus {
    /* background: #6f48eb;
    color: white; */
  }
`;

const StStatusColorChipContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 2px;
`;

const StStatusColorChip = styled.div`
  background-color: ${props => props.background};
  height: 8px;
  width: 8px;
  border-radius: 50%;
`;
