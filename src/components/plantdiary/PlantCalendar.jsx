import React from 'react';
import FullCalendar from '@fullcalendar/react'; // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid'; // a plugin!

export default function PlantCalendar() {
  return <FullCalendar plugins={[dayGridPlugin]} initialView="dayGridMonth" />;
}
