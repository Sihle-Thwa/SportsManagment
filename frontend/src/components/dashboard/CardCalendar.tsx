import { Card, CardContent, CardFooter } from "../ui/card";
import { CalendarObject } from "../common/CalendarObject";
import { Button } from "../common/Button/Button";

export function CardCalendar() {
  return (
    <Card className="card flex max-h-[345px] items-center justify-center">
      <CardContent className="card-body w-fit h-fit flex overflow-y-auto">
        <CalendarObject />
      </CardContent>
      <CardFooter className="card-footer">
        <Button className="btn btn--primary btn--icon-only w-fit">
          Manage Calendar
        </Button>
      </CardFooter>
    </Card>
  );
}
