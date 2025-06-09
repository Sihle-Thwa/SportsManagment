import { Card, CardContent, CardFooter } from "../ui/card";
import { CalendarObject } from "../common/CalendarObject";
import { Button } from "../common/Button/Button";

export function CardCalendar() {
  return (
    <Card className="card flex flex-col max-w-full max-h-[345px] items-center justify-center overflow-hidden">
      <CardContent className="">
        <CalendarObject />
      </CardContent>
      <CardFooter className="card-footer">
        <Button variant="primary"
          size="md"
          withIcon={false}
        >
          Manage Calendar
        </Button>
      </CardFooter>
    </Card>
  );
}
