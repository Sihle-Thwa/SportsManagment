import {
    format,
    startOfDay,
    addHours,
    startOfMonth,
    endOfMonth,
    startOfWeek,
    endOfWeek,
    eachDayOfInterval,
    addMonths,
} from "date-fns";
import { ChevronLeft, ChevronRight, Plus } from "lucide-react";

type EventItem = {
    id: string;
    title: string;
    date: string; // YYYY-MM-DD
    time?: string;
    description?: string;
};

export default function CalendarView({
    currentDate,
    onPrev,
    onNext,
    view,
    onChangeView,
    onAddEvent,
    events,
    onSelectDate,
}: {
    currentDate: Date;
    onPrev: () => void;
    onNext: () => void;
    view: "day" | "month" | "year";
    onChangeView: (v: "day" | "month" | "year") => void;
    onAddEvent: () => void;
    events: EventItem[];
    onSelectDate: (d: Date) => void;
}) {
    return (
        <div className="calendarViewRoot">
            <div className="calendarViewTop">
                <div className="calendarControlsLeft">
                    <button className="ctrlBtn" onClick={onPrev} aria-label="Previous period">
                        <ChevronLeft />
                    </button>
                    <div className="calendarTitle" aria-live="polite">
                        {view === "day" && format(currentDate, "dd MMMM yyyy")}
                        {view === "month" && format(currentDate, "MMMM yyyy")}
                        {view === "year" && format(currentDate, "yyyy")}
                    </div>
                    <button className="ctrlBtn" onClick={onNext} aria-label="Next period">
                        <ChevronRight />
                    </button>
                </div>

                <div className="calendarControlsRight">
                    <select
                        aria-label="Select view"
                        className="viewSelect"
                        value={view}
                        onChange={(e) => onChangeView(e.target.value as "day" | "month" | "year")}
                    >
                        <option value="day">Day</option>
                        <option value="month">Month</option>
                        <option value="year">Year</option>
                    </select>

                    <button className="addEventBtn" onClick={onAddEvent}>
                        <Plus /> <span className="addEventText">Add Event</span>
                    </button>
                </div>
            </div>

            <div className="calendarViewBody" role="region" aria-label="Calendar content">
                {view === "day" && <DayView date={currentDate} events={events} />}
                {view === "month" && <MonthView date={currentDate} events={events} onSelectDate={onSelectDate} />}
                {view === "year" && <YearView date={currentDate} events={events} onSelectDate={onSelectDate} />}
            </div>
        </div>
    );
}

/* --- Day view (hour slots) --- */
function DayView({ date, events }: { date: Date; events: EventItem[] }) {
    const dayStart = startOfDay(date);
    const hours = Array.from({ length: 24 }, (_, i) => addHours(dayStart, i));
    const eventsForDay = events.filter((e) => e.date === format(date, "yyyy-MM-dd"));

    return (
        <div className="dayView">
            <div className="dayViewGrid" role="list">
                {hours.map((h) => (
                    <div className="hourRow" key={h.toISOString()} role="listitem">
                        <div className="hourLabel">{format(h, "HH:00")}</div>
                        <div className="hourContent">
                            {eventsForDay
                                .filter(
                                    (ev) =>
                                        ev.time &&
                                        parseInt(ev.time.slice(0, 2), 10) === parseInt(format(h, "HH"), 10)
                                )
                                .map((ev) => (
                                    <div key={ev.id} className="eventChip">
                                        {ev.title} {ev.time ? `• ${ev.time}` : ""}
                                    </div>
                                ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

/* --- Month view (calendar grid) --- */
function MonthView({
    date,
    events,
    onSelectDate,
}: {
    date: Date;
    events: EventItem[];
    onSelectDate: (d: Date) => void;
}) {
    const start = startOfWeek(startOfMonth(date), { weekStartsOn: 1 });
    const end = endOfWeek(endOfMonth(date), { weekStartsOn: 1 });
    const days = eachDayOfInterval({ start, end });

    return (
        <div className="monthView">
            <div className="monthGridHeader">
                {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((d) => (
                    <div key={d} className="monthGridHeaderCell">
                        {d}
                    </div>
                ))}
            </div>

            <div className="monthGrid">
                {days.map((d) => {
                    const dayEvents = events.filter((ev) => ev.date === format(d, "yyyy-MM-dd"));
                    const isCurrentMonth = d.getMonth() === date.getMonth();
                    return (
                        <button
                            key={d.toISOString()}
                            className={`monthDay ${isCurrentMonth ? "" : "is-dimmed"}`}
                            onClick={() => onSelectDate(d)}
                            aria-pressed={format(d, "yyyy-MM-dd") === format(date, "yyyy-MM-dd")}
                        >
                            <div className="monthDayNum">{format(d, "d")}</div>
                            <div className="monthDayEvents">
                                {dayEvents.slice(0, 2).map((ev) => (
                                    <div key={ev.id} className="monthEvent">
                                        {ev.title}
                                    </div>
                                ))}
                                {dayEvents.length > 2 && <div className="moreTag">+{dayEvents.length - 2}</div>}
                            </div>
                        </button>
                    );
                })}
            </div>
        </div>
    );
}

/* --- Year view: small 12 month previews --- */
function YearView({
    date,
    onSelectDate,
}: {
    date: Date;
    events: EventItem[];
    onSelectDate: (d: Date) => void;
}) {
    const startYear = startOfMonth(new Date(date.getFullYear(), 0, 1));
    const months = Array.from({ length: 12 }, (_, i) => addMonths(startYear, i));

    return (
        <div className="yearView">
            <div className="yearGrid">
                {months.map((m) => (
                    <div key={m.toISOString()} className="miniMonth">
                        <div className="miniMonthTitle">{format(m, "MMM")}</div>
                        <div className="miniMonthGrid">
                            {/* simple placeholder grid: first day click drills into month */}
                            {Array.from({ length: 28 }).map((_, idx) => (
                                <button
                                    key={idx}
                                    className="miniMonthCell"
                                    aria-hidden={false}
                                    onClick={() => onSelectDate(addMonths(startOfMonth(m), 0))}
                                />
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
