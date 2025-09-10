import { Card, CardContent, CardFooter } from "../ui/card";
import { CalendarObject } from "../common/CalendarObject";

export function CardCalendar() {
	return (
		<Card className="card card-calendar">
			<CardContent className="card-body">
				<CalendarObject />
			</CardContent>
			<CardFooter className="card-footer">
				<div className="card-action">
					<button className="button button-primary">Manage Calendar</button>
				</div>
			</CardFooter>
		</Card>
	);
}
