import {
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  addDays,
  format,
  isSameMonth,
  isSameDay,
  parseISO,
} from "date-fns";

type EventItem = {
  id: string;
  title: string;
  date: string; // YYYY-MM-DD
  time?: string;
  description?: string;
};

export default function SidebarCalendar({
  currentDate,
  onChangeDate,
  events = [],
}: {
  currentDate: Date;
  onChangeDate: (d: Date) => void;
  events: EventItem[];
}) {
  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(monthStart);
  const startDate = startOfWeek(monthStart, { weekStartsOn: 1 }); // Monday
  const endDate = endOfWeek(monthEnd, { weekStartsOn: 1 });

  const rows: Date[][] = [];
  let day = startDate;
  while (day <= endDate) {
    const week: Date[] = [];
    for (let i = 0; i < 7; i++) {
      week.push(day);
      day = addDays(day, 1);
    }
    rows.push(week);
  }

  // upcoming events for the month (sorted)
  const eventsThisMonth = events
    .filter((e) => e.date.startsWith(format(monthStart, "yyyy-MM")))
    .sort((a, b) => a.date.localeCompare(b.date));

  return (
    <div className="sidebarCalendar">
      <header className="sidebarCalendarHeader">
        <div className="sidebarCalendarMonth">
          {format(monthStart, "MMMM yyyy")}
        </div>
      </header>

      <table className="miniCalendar" aria-label="Month calendar">
        <thead>
          <tr>
            {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((d) => (
              <th key={d} scope="col" className="miniCalendarHead">
                {d}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {rows.map((week, wi) => (
            <tr key={wi} className="miniCalendarWeek">
              {week.map((d) => {
                const dayHasEvent = events.some(
                  (ev) => ev.date === format(d, "yyyy-MM-dd")
                );
                return (
                  <td key={d.toISOString()} className="miniCalendarDayCell">
                    <button
                      type="button"
                      className={`miniCalendarDayBtn ${
                        isSameDay(d, currentDate) ? "is-today" : ""
                      } ${!isSameMonth(d, monthStart) ? "is-dimmed" : ""}`}
                      onClick={() => onChangeDate(d)}
                      aria-pressed={isSameDay(d, currentDate)}
                      aria-label={`Go to ${format(d, "do MMMM yyyy")}`}
                    >
                      <span className="miniCalendarDayNumber">
                        {format(d, "d")}
                      </span>
                      {dayHasEvent && (
                        <span className="miniCalendarDot" aria-hidden />
                      )}
                    </button>
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>

      <div className="sidebarUpcoming">
        <h4 className="sidebarUpcomingTitle">Upcoming events</h4>
        {eventsThisMonth.length === 0 ? (
          <div className="sidebarUpcomingEmpty" aria-live="polite">
            <div className="sidebarUpcomingEmptyEmoji" aria-hidden>
              🎉
            </div>
            <div>No upcoming events</div>
          </div>
        ) : (
          <ul className="sidebarUpcomingList">
            {eventsThisMonth.map((ev) => (
              <li key={ev.id} className="sidebarUpcomingItem">
                <div className="sidebarUpcomingItemDate">
                  {format(parseISO(ev.date), "dd MMM")}
                </div>
                <div className="sidebarUpcomingItemContent">
                  <div className="sidebarUpcomingItemTitle">{ev.title}</div>
                  {ev.time && (
                    <div className="sidebarUpcomingItemTime">{ev.time}</div>
                  )}
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
