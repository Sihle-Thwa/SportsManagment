import { Card, CardContent, CardFooter } from "../ui/card";
import { CalendarObject } from "../common/CalendarObject";
import { Button } from "../ui/button";

export function CardCalendar() {
  return (
    <Card className="flex flex-col py-3 px-6 w-full h-full items-center justify-items-center gap-2 shrink-0">
      <CardContent className="">
        <CalendarObject />
      </CardContent>
      <CardFooter >
        <Button variant="outline">
          <span className="max-w-32 max-h-7 text-sm">Manage Calendar</span>
        </Button>
      </CardFooter>
    </Card>
  );
}
