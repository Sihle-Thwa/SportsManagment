"use client";
import React from "react";
import { Calendar } from "../../../ui/calendar";
import { Skeleton } from "../../Skeleton/Skeleton";

export function CalendarObject({ loading = false }: { loading?: boolean }) {
	const [date, setDate] = React.useState<Date | undefined>(new Date());
	React.useEffect(() => {
		setDate(new Date());
	}, []);

	if (loading) {
		return (
			<div className="card card-calendar">
				<div className="card-header">
					<div className="card-header-title">Calendar</div>
				</div>
				<div className="card-body">
					<Skeleton className="skeleton-calendar" />
				</div>
			</div>
		);
	}

	return (
		<div className="card card-calendar" aria-label="Calendar">
			<div className="card-header">
				<div className="card-header-title">Calendar</div>
			</div>
			<div className="card-body">
				<Calendar mode="single" selected={date} onSelect={setDate} />
			</div>
		</div>
	);
}
