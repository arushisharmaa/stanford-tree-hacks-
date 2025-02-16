import React, { useState } from 'react';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, addMonths, subMonths, startOfWeek, endOfWeek, isSameMonth, isToday } from 'date-fns';
import './CalendarPage.css';
// events or data for each day
const initialEvents = {};

const Calendar = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [events, setEvents] = useState(initialEvents); 
  const [selectedDay, setSelectedDay] = useState(null);
  const [newEvent, setNewEvent] = useState("");

  const startOfCurrentMonth = startOfMonth(currentMonth);
  const endOfCurrentMonth = endOfMonth(currentMonth);

  const startOfWeekMonth = startOfWeek(startOfCurrentMonth);
  const endOfWeekMonth = endOfWeek(endOfCurrentMonth);

  const daysInMonth = eachDayOfInterval({ start: startOfWeekMonth, end: endOfWeekMonth });

  const formattedMonth = format(currentMonth, 'MMMM yyyy');

  const goToNextMonth = () => setCurrentMonth(addMonths(currentMonth, 1));
  const goToPreviousMonth = () => setCurrentMonth(subMonths(currentMonth, 1));

  // Handle day click to add or view events
  const handleDayClick = (day) => {
    setSelectedDay(day);
    setNewEvent(events[format(day, 'yyyy-MM-dd')] || "");
  };

  // Handle adding or editing events
  const handleEventChange = (event) => {
    setNewEvent(event);
  };

  const handleEventSave = () => {
    if (selectedDay) {
      setEvents((prevEvents) => ({
        ...prevEvents,
        [format(selectedDay, 'yyyy-MM-dd')]: newEvent,
      }));
      setSelectedDay(null);
      setNewEvent("");
    }
  };

  const handleCloseModal = () => {
    setSelectedDay(null);
    setNewEvent("");
  };

  return (
    <div className="calendar">
      <header>
        <button onClick={goToPreviousMonth}>&lt;</button>
        <h2>{formattedMonth}</h2>
        <button onClick={goToNextMonth}>&gt;</button>
      </header>

      <div className="days-of-week">
        <span>Sun</span>
        <span>Mon</span>
        <span>Tue</span>
        <span>Wed</span>
        <span>Thu</span>
        <span>Fri</span>
        <span>Sat</span>
      </div>

      <div className="days">
        {daysInMonth.map((day, index) => {
          const isCurrentMonth = isSameMonth(day, currentMonth);
          const isTodayDate = isToday(day);
          const eventData = events[format(day, 'yyyy-MM-dd')];

          return (
            <div
              key={index}
              className={`day ${isCurrentMonth ? '' : 'other-month'} ${isTodayDate ? 'today' : ''}`}
              onClick={() => handleDayClick(day)}
            >
              <div>{format(day, 'd')}</div>
              {eventData && <div className="event">{eventData}</div>}
            </div>
          );
        })}
      </div>

      {selectedDay && (
        <div className="event-modal">
          <button className="close-btn" onClick={handleCloseModal}>X</button>
          <h3>Event for {format(selectedDay, 'MMM d, yyyy')}</h3>
          <textarea
            value={newEvent}
            onChange={(e) => handleEventChange(e.target.value)}
            placeholder="Add event..."
          />
          <button onClick={handleEventSave}>Save Event</button>
        </div>
      )}
    </div>
  );
};

export default Calendar;
