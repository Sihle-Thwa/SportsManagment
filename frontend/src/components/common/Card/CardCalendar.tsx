import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { CalendarObject } from "@/components/common/CalendarObject";
import { Button } from "@/components/ui/button";

export function CardCalendar() {
  return (
    <Card className="inline-flex flex-col py-3 px-6 w-80 h-full items-center justify-content gap-2 flex-shrink-0">
      <CardContent className="">
        <CalendarObject />
      </CardContent>
      <CardFooter className="">
        <Button variant="outline">
          <span className="max-w-32 max-h-7 text-sm">Manage Calendar</span>
        </Button>
      </CardFooter>
    </Card>
  );
}
