import React from "react";
import {addMonths, subMonths} from "date-fns";
import "./planner.css";
import CalendarView from "./CalendarView";
import SidebarCalendar from "./SidebarCalendar";
import {mockEvents} from "../../routes/plannermockdata";

export default function Planner() {

  const [currentDate, setCurrentDate] = React.useState<Date> (new Date());
  const [view, setView] = React.useState<"day" | "month" | "year">("day");
  const [events, setEvents] = React.useState(mockEvents);

  function onPrev() {
    setCurrentDate((d) =>
      view === "year" ? subMonths(d, 12) : subMonths(d, 1)
    );
  }
  function onNext() {
    setCurrentDate((d) =>
      view === "year" ? addMonths(d, 12) : addMonths(d, 1)
    );
  }

  function handleAddEvent() {
    const newEvent = {
      id: `evt-${Date.now()}`,
      title: "New Event",
      date: currentDate.toISOString().slice(0, 10),
      time: "09:00",
      description: "Added from planner",
    };
    setEvents((s) => [newEvent, ...s]);
  }

  return (
    <div className="plannerRoot" role="application" aria-label="Planner">
      <div className="plannerContainer">
        <div className="plannerContent">
     <div className="plannerSidebar" aria-label="Calendar navigation">
        <SidebarCalendar
          currentDate={currentDate}
          onChangeDate={(d) => setCurrentDate(d)}
          events={events}
        />
      </div>

      <section className="plannerMain" aria-live="polite">
        <CalendarView
          currentDate={currentDate}
          onPrev={onPrev}
          onNext={onNext}
          view={view}
          onChangeView={setView}
          onAddEvent={handleAddEvent}
          events={events}
          onSelectDate={(d) => setCurrentDate(d)}
        />
      </section>
        </div>
      </div>
     
    </div>
  );
}