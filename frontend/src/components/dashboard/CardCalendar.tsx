import { Card, CardContent, CardFooter } from "../ui/card";
import { CalendarObject } from "../common/CalendarObject";
import { Button } from "../ui/button";

export function CardCalendar() {
  return (
    <Card className="card-base flex flex-col  h-full items-center">
      <CardContent className="card-body flex flex-row w-fit h-fit">
        <CalendarObject />
      </CardContent>
      <CardFooter className="card-footer">
        <Button className="btn-secondary">
          <span className="max-w-full">Manage Calendar</span>
        </Button>
      </CardFooter>
    </Card>
  );
}
