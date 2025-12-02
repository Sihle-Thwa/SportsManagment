import React, { useMemo, useCallback } from "react";
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
    startOfYear,
    addDays,
} from "date-fns";
import { ChevronLeft, ChevronRight, Plus } from "lucide-react";

/* --- Types --- */
type EventItem = {
    id: string;
    title: string;
    date: string; // YYYY-MM-DD
    time?: string; // HH:mm
    description?: string;
};

type CalendarViewProps = {
    currentDate: Date;
    onPrev: () => void;
    onNext: () => void;
    view: "day" | "month" | "year";
    onChangeView: (v: "day" | "month" | "year") => void;
    onAddEvent: () => void;
    events: EventItem[];
    onSelectDate: (d: Date) => void;
};

/* --- Helpers --- */
const dateKey = (d: Date) => format(d, "yyyy-MM-dd");

export default function CalendarView({
    currentDate,
    onPrev,
    onNext,
    view,
    onChangeView,
    onAddEvent,
    events,
    onSelectDate,
}: CalendarViewProps) {
    // Index events by date for efficient lookup
    const eventsByDate = useMemo(() => {
        const map = new Map<string, EventItem[]>();
        for (const ev of events) {
            const list = map.get(ev.date) ?? [];
            list.push(ev);
            map.set(ev.date, list);
        }
        return map;
    }, [events]);

    return (
        <div className="calendarViewRoot">
            <div className="calendarViewTop">
                <div className="calendarControlsLeft">
                    <button
                        className="ctrlBtn"
                        onClick={onPrev}
                        aria-label="Previous period"
                        title="Previous"
                    >
                        <ChevronLeft />
                    </button>

                    <div className="calendarTitle" aria-live="polite" aria-atomic>
                        {view === "day" && format(currentDate, "dd MMMM yyyy")}
                        {view === "month" && format(currentDate, "MMMM yyyy")}
                        {view === "year" && format(currentDate, "yyyy")}
                    </div>

                    <button
                        className="ctrlBtn"
                        onClick={onNext}
                        aria-label="Next period"
                        title="Next"
                    >
                        <ChevronRight />
                    </button>

                    <label htmlFor="calendarViewSelect" className="sr-only">
                        Select view
                    </label>
                    <select
                        id="calendarViewSelect"
                        aria-label="Select view"
                        className="viewSelect"
                        value={view}
                        onChange={(e) =>
                            onChangeView(e.target.value as "day" | "month" | "year")
                        }
                    >
                        <option value="day">Day</option>
                        <option value="month">Month</option>
                        <option value="year">Year</option>
                    </select>
                </div>

                <div className="calendarControlsRight">
                    <button
                        className="addEventBtn"
                        onClick={onAddEvent}
                        aria-label="Add event"
                    >
                        <Plus /> <span className="addEventText">Add Event</span>
                    </button>
                </div>
            </div>

            <main
                className="calendarViewBody"
                role="region"
                aria-label="Calendar content"
            >
                {view === "day" && (
                    <DayView date={currentDate} eventsByDate={eventsByDate} />
                )}
                {view === "month" && (
                    <MonthView
                        date={currentDate}
                        eventsByDate={eventsByDate}
                        onSelectDate={onSelectDate}
                    />
                )}
                {view === "year" && (
                    <YearView
                        date={currentDate}
                        eventsByDate={eventsByDate}
                        onSelectDate={onSelectDate}
                    />
                )}
            </main>
        </div>
    );
}

/* --- Day view (hour slots) --- */
function DayView({
    date,
    eventsByDate,
}: {
    date: Date;
    eventsByDate: Map<string, EventItem[]>;
}) {
    const dayStart = startOfDay(date);
    const hours = useMemo(
        () => Array.from({ length: 24 }, (_, i) => addHours(dayStart, i)),
        [dayStart]
    );

    const key = dateKey(date);
    const eventsForDay = eventsByDate.get(key) ?? [];

    return (
        <section className="dayView" aria-label={format(date, " d MMMM yyyy")}>
            <ol className="dayViewGrid" role="list" aria-label="Hours">
                {hours.map((h) => {
                    const hourStr = format(h, "HH");
                    const eventsThisHour = eventsForDay.filter(
                        (ev) => ev.time?.slice(0, 2) === hourStr
                    );

                    return (
                        <li
                            className="hourRow"
                            key={h.toISOString()}
                            role="listitem"
                            aria-label={`${format(h, "HH:00")}`}
                        >
                            <div className="hourLabel" aria-hidden>
                                {format(h, "HH:00")}
                            </div>

                            <div className="hourContent" role="group" aria-label={`${format(h, "HH:00")} events`}>
                                {eventsThisHour.length === 0 && (
                                    <div className="hourEmpty" aria-hidden>
                                        &nbsp;
                                    </div>
                                )}
                                {eventsThisHour.map((ev) => (
                                    <button
                                        key={ev.id}
                                        className="eventChip"
                                        onClick={() => {
                                            /* Placeholder for event action (open details) */
                                        }}
                                        aria-label={`${ev.title}${ev.time ? ` at ${ev.time}` : ""}`}
                                    >
                                        <div className="eventChipTitle">{ev.title}</div>
                                        {ev.time && (
                                            <time className="eventChipTime" dateTime={`${key}T${ev.time}`}>
                                                {ev.time}
                                            </time>
                                        )}
                                    </button>
                                ))}
                            </div>
                        </li>
                    );
                })}
            </ol>
        </section>
    );
}

/* --- Month view (calendar grid) --- */
function MonthView({
    date,
    eventsByDate,
    onSelectDate,
}: {
    date: Date;
    eventsByDate: Map<string, EventItem[]>;
    onSelectDate: (d: Date) => void;
}) {
    // compute grid from start of week to end of week for full month view
    const start = startOfWeek(startOfMonth(date), { weekStartsOn: 1 });
    const end = endOfWeek(endOfMonth(date), { weekStartsOn: 1 });
    const days = useMemo(
        () => eachDayOfInterval({ start, end }),
        [start, end]
    );

    // split into weeks of 7 days
    const weeks: Date[][] = useMemo(() => {
        const rows: Date[][] = [];
        for (let i = 0; i < days.length; i += 7) {
            rows.push(days.slice(i, i + 7));
        }
        return rows;
    }, [days]);

    const monthKey = format(date, "yyyy-MM");
    const selectedKey = dateKey(date);

    const onDayKeyDown = useCallback(
        (e: React.KeyboardEvent<HTMLButtonElement>, d: Date) => {
            // Allow Enter/Space to activate (default for button) — handle Arrow keys for convenience
            const key = e.key;
            let offset = 0;
            if (key === "ArrowLeft") offset = -1;
            if (key === "ArrowRight") offset = 1;
            if (key === "ArrowUp") offset = -7;
            if (key === "ArrowDown") offset = 7;
            if (offset !== 0) {
                e.preventDefault();
                const newDate = addDays(d, offset);
                // find button for newDate and focus it
                const id = `day-${dateKey(newDate)}`;
                const el = document.getElementById(id) as HTMLElement | null;
                if (el) el.focus();
            }
        },
        []
    );

    return (
        <section
            className="monthView"
            aria-label={format(date, "MMMM yyyy")}
            role="region"
        >
            <div className="monthGridHeader" aria-hidden>
                {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((d) => (
                    <div key={d} className="monthGridHeaderCell">
                        {d}
                    </div>
                ))}
            </div>

            <div
                className="monthGrid"
                role="grid"
                aria-labelledby={`month-${monthKey}`}
                id={`month-${monthKey}`}
            >
                {weeks.map((week, rIdx) => (
                    <div className="monthGridRow" role="row" key={rIdx}>
                        {week.map((d) => {
                            const k = dateKey(d);
                            const dayEvents = eventsByDate.get(k) ?? [];
                            const isCurrentMonth = d.getMonth() === date.getMonth();
                            const isSelected = k === selectedKey;

                            return (
                                <div
                                    role="gridcell"
                                    aria-selected={isSelected}
                                    key={k}
                                    className={`monthGridCell ${isCurrentMonth ? "" : "is-dimmed"}`}
                                >
                                    <button
                                        id={`day-${k}`}
                                        type="button"
                                        className={`monthDay ${isSelected ? "is-selected" : ""}`}
                                        onClick={() => onSelectDate(d)}
                                        onKeyDown={(e) => onDayKeyDown(e, d)}
                                        aria-pressed={isSelected}
                                        aria-label={`${format(d, "EEEE, do MMMM yyyy")}${
                                            dayEvents.length ? ` — ${dayEvents.length} event(s)` : ""
                                        }`}
                                    >
                                        <div className="monthDayNum" aria-hidden={false}>
                                            {format(d, "d")}
                                        </div>

                                        <div className="monthDayEvents" aria-hidden={dayEvents.length === 0}>
                                            {dayEvents.slice(0, 2).map((ev) => (
                                                <div key={ev.id} className="monthEvent">
                                                    {ev.title}
                                                </div>
                                            ))}
                                            {dayEvents.length > 2 && (
                                                <div className="moreTag" aria-hidden>
                                                    +{dayEvents.length - 2}
                                                </div>
                                            )}
                                        </div>
                                    </button>
                                </div>
                            );
                        })}
                    </div>
                ))}
            </div>
        </section>
    );
}

/* --- Year view: 12 month previews --- */
function YearView({
    date,
    eventsByDate,
    onSelectDate,
}: {
    date: Date;
    eventsByDate: Map<string, EventItem[]>;
    onSelectDate: (d: Date) => void;
}) {
    const yearStart = startOfYear(date);
    const months = useMemo(
        () => Array.from({ length: 12 }, (_, i) => addMonths(startOfMonth(yearStart), i)),
        [yearStart]
    );

    return (
        <section className="yearView" aria-label={format(date, "yyyy")} role="region">
            <div className="yearGrid" role="list">
                {months.map((m) => {
                    // prepare a small grid (6 rows x 7 cols) for each month so layout is predictable
                    const start = startOfWeek(startOfMonth(m), { weekStartsOn: 1 });
                    const end = endOfWeek(endOfMonth(m), { weekStartsOn: 1 });
                    const cells = eachDayOfInterval({ start, end });

                    const hasEvents = cells.some((d) =>
                        eventsByDate.has(dateKey(d))
                    );

                    return (
                        <div key={m.toISOString()} className="miniMonth" role="listitem" aria-label={format(m, "MMMM")}>
                            <div className="miniMonthTitle">
                                <strong>{format(m, "MMM")}</strong>
                                {hasEvents && (
                                    <span className="eventIndicator" title="Has events" aria-hidden>
                                        •
                                    </span>
                                )}
                            </div>

                            <div className="miniMonthGrid" role="grid" aria-label={`${format(m, "MMMM yyyy")}`}>
                                {cells.map((d) => {
                                    const k = dateKey(d);
                                    const has = eventsByDate.has(k);
                                    const isThisMonth = d.getMonth() === m.getMonth();
                                    return (
                                        <button
                                            key={k}
                                            type="button"
                                            className={`miniMonthCell ${isThisMonth ? "" : "is-dimmed"} ${
                                                has ? "has-events" : ""
                                            }`}
                                            aria-label={`${format(d, "do MMM")} ${has ? " — has events" : ""}`}
                                            onClick={() => onSelectDate(d)}
                                            title={format(d, "d MMM yyyy")}
                                        />
                                    );
                                })}
                            </div>
                        </div>
                    );
                })}
            </div>
        </section>
    );
}
