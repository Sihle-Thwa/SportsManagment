import { Card, CardContent, CardFooter } from "../ui/card";
import { CalendarObject } from "../common/CalendarObject";
import { Button } from "../common/Button/Button";

export function CardCalendar() {
  return (
    <Card className="card-base flex flex-col max-w-full max-h-[345px] items-center justify-center overflow-hidden">
      <CardContent className="card-body">
        <CalendarObject />
      </CardContent>
      <CardFooter className="card-footer">
        <Button className="btn-base" size="sm" variant="primary">
          <span >Manage Calendar</span>
        </Button>
      </CardFooter>
    </Card>
  );
}
