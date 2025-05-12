import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { CalendarObject } from "@/components/common/CalendarObject";
import { Button } from "@/components/ui/button";

export function CardCalendar() {
  return (
    <Card className="w-80 h-full">
      <CardContent className="flex flex-col items-center justify-center">
        <CalendarObject />
      </CardContent>
      <CardFooter className="flex flex-col items-center justify-center">
        <Button variant="outline">
          <span className="text-sm">Manage Calendar</span>
        </Button>
      </CardFooter>
    </Card>
  );
}
