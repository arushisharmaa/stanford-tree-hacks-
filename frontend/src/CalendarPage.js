// import React, { useState } from 'react';
// import { format, startOfMonth, endOfMonth, eachDayOfInterval, addMonths, subMonths, startOfWeek, endOfWeek, isSameMonth, isToday } from 'date-fns';
// import './CalendarPage.css';
// // events or data for each day
// const initialEvents = {};

// const Calendar = () => {
//   const [currentMonth, setCurrentMonth] = useState(new Date());
//   const [events, setEvents] = useState(initialEvents); 
//   const [selectedDay, setSelectedDay] = useState(null);
//   const [newEvent, setNewEvent] = useState("");

//   const startOfCurrentMonth = startOfMonth(currentMonth);
//   const endOfCurrentMonth = endOfMonth(currentMonth);

//   const startOfWeekMonth = startOfWeek(startOfCurrentMonth);
//   const endOfWeekMonth = endOfWeek(endOfCurrentMonth);

//   const daysInMonth = eachDayOfInterval({ start: startOfWeekMonth, end: endOfWeekMonth });

//   const formattedMonth = format(currentMonth, 'MMMM yyyy');

//   const goToNextMonth = () => setCurrentMonth(addMonths(currentMonth, 1));
//   const goToPreviousMonth = () => setCurrentMonth(subMonths(currentMonth, 1));

//   // Handle day click to add or view events
//   const handleDayClick = (day) => {
//     setSelectedDay(day);
//     setNewEvent(events[format(day, 'yyyy-MM-dd')] || "");
//   };

//   // Handle adding or editing events
//   const handleEventChange = (event) => {
//     setNewEvent(event);
//   };

//   const handleEventSave = () => {
//     if (selectedDay) {
//       setEvents((prevEvents) => ({
//         ...prevEvents,
//         [format(selectedDay, 'yyyy-MM-dd')]: newEvent,
//       }));
//       setSelectedDay(null);
//       setNewEvent("");
//     }
//   };

//   const handleCloseModal = () => {
//     setSelectedDay(null);
//     setNewEvent("");
//   };

//   return (
//     <div className="calendar">
//       <header>
//         <button onClick={goToPreviousMonth}>&lt;</button>
//         <h2>{formattedMonth}</h2>
//         <button onClick={goToNextMonth}>&gt;</button>
//       </header>

//       <div className="days-of-week">
//         <span>Sun</span>
//         <span>Mon</span>
//         <span>Tue</span>
//         <span>Wed</span>
//         <span>Thu</span>
//         <span>Fri</span>
//         <span>Sat</span>
//       </div>

//       <div className="days">
//         {daysInMonth.map((day, index) => {
//           const isCurrentMonth = isSameMonth(day, currentMonth);
//           const isTodayDate = isToday(day);
//           const eventData = events[format(day, 'yyyy-MM-dd')];

//           return (
//             <div
//               key={index}
//               className={`day ${isCurrentMonth ? '' : 'other-month'} ${isTodayDate ? 'today' : ''}`}
//               onClick={() => handleDayClick(day)}
//             >
//               <div>{format(day, 'd')}</div>
//               {eventData && <div className="event">{eventData}</div>}
//             </div>
//           );
//         })}
//       </div>

//       {selectedDay && (
//         <div className="event-modal">
//           <button className="close-btn" onClick={handleCloseModal}>X</button>
//           <h3>Event for {format(selectedDay, 'MMM d, yyyy')}</h3>
//           <textarea
//             value={newEvent}
//             onChange={(e) => handleEventChange(e.target.value)}
//             placeholder="Add event..."
//           />
//           <button onClick={handleEventSave}>Save Event</button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Calendar;



import React, { useState, useEffect } from 'react';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, addMonths, subMonths, startOfWeek, endOfWeek, isSameMonth, isToday, getDay } from 'date-fns';
import './CalendarPage.css';

const generateRandomEvents = (month) => {
  const start = startOfMonth(month);
  const end = endOfMonth(month);
  const days = eachDayOfInterval({ start, end });

  let randomEvents = {};
  const courseEvents = [
    "CS Lecture", "Math Homework Due", "AI Project Presentation", "Physics Lab", "Database Quiz",
    "Machine Learning Study Session", "Software Engineering Exam", "Cybersecurity Workshop"
  ];
  const generalEvents = [
    "Gym", "Grocery Shopping", "Movie Night", "Dinner with Friends", "Doctor's Appointment"
  ];

  days.forEach((day) => {
    const dayOfWeek = getDay(day); // 0 = Sunday, 1 = Monday, ..., 6 = Saturday
    let eventProbability = 0.1;

    if (dayOfWeek >= 1 && dayOfWeek <= 5) {
      eventProbability = 0.6;
    } else if (dayOfWeek === 6) {
      eventProbability = 0.2;
    }

    if (Math.random() < eventProbability) {
      const eventList = dayOfWeek >= 1 && dayOfWeek <= 5 ? courseEvents : generalEvents;
      randomEvents[format(day, 'yyyy-MM-dd')] = eventList[Math.floor(Math.random() * eventList.length)];
    }
  });

  return randomEvents;
};

const Calendar = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [events, setEvents] = useState({});
  const [selectedDay, setSelectedDay] = useState(null);
  const [newEvent, setNewEvent] = useState("");

  useEffect(() => {
    const randomEvents = generateRandomEvents(currentMonth);

    fetch('https://zoom-test-apis.onrender.com/calendars/12adbsa3455/events')
      .then(response => response.json())
      .then(data => {
        let fetchedEvents = {};
        data.items.forEach(event => {
          const eventDate = format(new Date(event.start.dateTime), 'yyyy-MM-dd');
          fetchedEvents[eventDate] = event.summary;
        });

        setEvents((prevEvents) => ({
          ...randomEvents,
          ...fetchedEvents,
          ...prevEvents, // Preserve manually added events
        }));
      })
      .catch(error => console.error('Error fetching events:', error));
  }, [currentMonth]);

  const handleDayClick = (day) => {
    setSelectedDay(day);
    setNewEvent(events[format(day, 'yyyy-MM-dd')] || "");
  };

  const handleEventChange = (e) => {
    setNewEvent(e.target.value);
  };

  const saveEvent = () => {
    if (selectedDay) {
      setEvents({
        ...events,
        [format(selectedDay, 'yyyy-MM-dd')]: newEvent,
      });
      setSelectedDay(null);
      setNewEvent("");
    }
  };

  const startOfCurrentMonth = startOfMonth(currentMonth);
  const endOfCurrentMonth = endOfMonth(currentMonth);
  const startOfWeekMonth = startOfWeek(startOfCurrentMonth);
  const endOfWeekMonth = endOfWeek(endOfCurrentMonth);
  const daysInMonth = eachDayOfInterval({ start: startOfWeekMonth, end: endOfWeekMonth });
  const formattedMonth = format(currentMonth, 'MMMM yyyy');

  return (
    <div className="calendar">
      <header>
        <button onClick={() => setCurrentMonth(subMonths(currentMonth, 1))}>&lt;</button>
        <h2>{formattedMonth}</h2>
        <button onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}>&gt;</button>
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

      {/* {selectedDay && (
        <div className="event-modal">
          <h3>{format(selectedDay, 'MMMM dd, yyyy')}</h3>
          <input type="text" value={newEvent} onChange={handleEventChange} placeholder="Enter event" />
          <button>className = "link"</button>
          <button onClick={saveEvent}>Save</button>
          <button onClick={() => setSelectedDay(null)}>X</button>
        </div>
      )} */}

      {selectedDay && (
        <div className="event-modal">
          <h3>{format(selectedDay, 'MMMM dd, yyyy')}</h3>
          <input 
            type="text" 
            value={newEvent} 
            onChange={handleEventChange} 
            placeholder="Enter event" 
          />
          {/* Add a link for a className action */}
          <a href="#" className="link">
            <button>Go to event details</button>
          </a>
          <button onClick={saveEvent}>Save</button>
          <button onClick={() => setSelectedDay(null)}>X</button>
        </div>
      )}
    </div>
  );
};

export default Calendar;
