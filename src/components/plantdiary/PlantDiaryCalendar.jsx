import { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import { Calendar } from 'react-calendar';
import { format } from 'date-fns';
import { palette } from '../../styles/palette';
import { getCalendarDataApi } from '../../apis/plantDiary';

const marks = [
  '15-01-2023',
  '03-01-2023',
  '07-01-2023',
  '12-01-2023',
  '13-01-2023',
  '15-01-2023',
];

const MOCK = [
  { localDate: '2023-01-26', nutrition: 1, repot: 1, water: 1 },
  { localDate: '2023-01-27', nutrition: 1, repot: 1, water: 1 },
];

export default function PlantDiaryCalendar({ plantJournalId }) {
  const [value, setValue] = useState([new Date(), new Date('2023-01-26')]);
  const [diaryValue, setDiaryValue] = useState();

  const getCalendar = useCallback(async () => {
    const data = await getCalendarDataApi(plantJournalId);
    setDiaryValue(data.data);
  }, [plantJournalId]);

  useEffect(() => {
    getCalendar();
  }, [getCalendar]);

  // console.log([new Date(), new Date('2023-01-26')]);
  return (
    <StInjection>
      <h1 className="text-center">React Calendar with Range</h1>
      <div className="calendar-container">
        <Calendar
          // onChange={onChange}
          // disable 처리
          // tileDisabled={v => {
          //   console.log({ v });
          //   return true;
          // }}
          locale="en-EN"
          tileClassName={({ date, view }) => {
            if (MOCK.find(x => x.localDate === format(date, 'yyyy-MM-dd'))) {
              return 'highlight';
            }
            return '';
          }}
        />
      </div>
      {/* {date.length > 0 ? (
        <p className="text-center">
          <span className="bold">Start:</span> {date[0].toDateString()}
          &nbsp;|&nbsp;
          <span className="bold">End:</span> {date[1].toDateString()}
        </p>
      ) : (
        <p className="text-center">
          <span className="bold">Default selected date:</span>{' '}
          {date.toDateString()}
        </p>
      )} */}
    </StInjection>
  );
}
function renderEventContent(eventInfo) {
  return <> </>;
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
  /* .react-calendar__month-view__days__day--weekend {
 color: #d10000;
} */
  & .react-calendar__tile:enabled:hover,
  & .react-calendar__tile:enabled:focus {
    background: #f8f8fa;
    color: #6f48eb;
    border-radius: 6px;
  }
  & .react-calendar__tile--now {
    background: #6f48eb33;
    border-radius: 6px;
    font-weight: bold;
    color: #6f48eb;
  }
  & .react-calendar__tile--now:enabled:hover,
  & .react-calendar__tile--now:enabled:focus {
    background: #6f48eb33;
    border-radius: 6px;
    font-weight: bold;
    color: #6f48eb;
  }
  & .react-calendar__tile--hasActive:enabled:hover,
  & .react-calendar__tile--hasActive:enabled:focus {
    background: #f8f8fa;
  }
  & .react-calendar__tile--active {
    background: #6f48eb;
    border-radius: 6px;
    font-weight: bold;
    color: white;
  }
  & .react-calendar__tile--active:enabled:hover,
  & .react-calendar__tile--active:enabled:focus {
    background: #6f48eb;
    color: white;
  }
  & .highlight {
    &:after {
      width: 5px;
      background-color: ${palette.mainColor};
      border-radius: 50%;
      height: 5px;
      position: absolute;
      content: '';
      position: absolute;
      bottom: 0;
      left: 50%;
      transform: translate(-50%, -10%);
    }
  }
  /* & .react-calendar--selectRange .react-calendar__tile--hover {
    background-color: #f8f8fa;
  }
  & .react-calendar__tile--range {
    background: #f8f8fa;
    color: #6f48eb;
    border-radius: 0;
  }
  & .react-calendar__tile--rangeStart {
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
    border-top-left-radius: 6px;
    border-bottom-left-radius: 6px;
    background: #6f48eb;
    color: white;
  }
  & .react-calendar__tile--rangeEnd {
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
    border-top-right-radius: 6px;
    border-bottom-right-radius: 6px;
    background: #6f48eb;
    color: white;
  } */
`;
