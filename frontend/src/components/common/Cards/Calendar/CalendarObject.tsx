import * as React from "react";
import { Calendar } from "../../../ui/calendar";

export function CalendarObject() {
	const [date, setDate] = React.useState<Date | undefined>(new Date());
	// Initialize the date state with the current date
	React.useEffect(() => {
		setDate(new Date());
	}, []);

	return (
		<Calendar
			mode="single"
			selected={date}
			onSelect={setDate}
			className="w-full h-full "

			/*Fix Calendar Date Styling to match branding */
		/>
	);
}
