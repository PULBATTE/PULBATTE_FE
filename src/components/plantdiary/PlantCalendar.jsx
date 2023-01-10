import React from 'react';
import FullCalendar from '@fullcalendar/react'; // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid'; // a plugin!
import interactionPlugin from '@fullcalendar/interaction';
import styled from 'styled-components';

export default function PlantCalendar() {
  return (
    <StInjection>
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
        headerToolbar={{
          start: '',
          center: 'title',
          end: 'prev,next',
        }}
        events={[
          {
            title: 'event 1',
            date: '2023-01-10',
            display: 'background',
            color: 'green',
          },
          {
            title: 'event 2',
            date: '2023-01-12',
            display: 'background',
            color: 'green',
          },
        ]}
        dateClick={v => {
          alert(v);
        }}
        initialView="dayGridMonth"
        eventContent={renderEventContent}
        eventColor="transparent"
      />
    </StInjection>
  );
}
function renderEventContent(eventInfo) {
  return <> </>;
}
const StInjection = styled.div`
  & .fc-daygrid-day-events {
    width: 100%;
    height: 100%;
    display: flex;
  }
`;
