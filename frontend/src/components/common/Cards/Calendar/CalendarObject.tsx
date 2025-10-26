"use client";
import React from "react";
import { Calendar } from "../../../ui/calendar";
import "./calendarobject.css"; // CSS module import

export function CalendarObject() {
	const [date, setDate] = React.useState<Date | undefined>(new Date());
	React.useEffect(() => {
		setDate(new Date());
	}, []);

	const classNames = {
		// container level
		months: "months",
		month: "month",
		caption: "caption",
		caption_label: "caption_label",
		nav: "nav",
		nav_button: "nav_button",
		nav_button_previous: "nav_button_previous",
		nav_button_next: "nav_button_next",
		table: "table",
		head_row: "head_row",
		head_cell: "head_cell",
		row: "row",
		cell: "cell",
		// day specific
		day: "day",
		day_selected: "day_selected",
		day_today: "day_today",
		day_outside: "day_outside",
		day_disabled: "day_disabled",
		day_range_middle: "day_range_middle",
		// extend or override other keys as necessary
	};

	return (
		<div
			className="cardCalendar"
			aria-label="Calendar"
			data-component="dashboard-calendar"
		>
			<div className="cardHeader">
				<div className="cardHeaderTitle">Calendar</div>
			</div>

			<div className="cardBody">
				<Calendar
					mode="single"
					selected={date}
					onSelect={setDate}
					className="calendarRoot"
					classNames={classNames}
				/>
			</div>
		</div>
	);
}

export default CalendarObject;
