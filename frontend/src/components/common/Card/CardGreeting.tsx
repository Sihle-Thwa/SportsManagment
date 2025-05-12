import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import greetingCardImg from "@/assets/images/standing-dashboard-image.svg";

export function CardGreeting() {
  return (
    <div className="flex flex-col gap-6 ">
      <Card className=" overflow-hidden">
        <CardContent className="grid p-0 md:grid-cols-2">
          <div className="p-6 md:p-6">
            <CardHeader className="flex flex-col items-center text-center">
              <CardTitle className="text-2xl font-bold">
                Welcome, Laurel Higher Secondary School Team!
              </CardTitle>
              <CardDescription className="text-balance text-muted-foreground">
                Manage your teams operations with ease. Stay updated on events,
                players, members, and more—all in one place. Let’s keep shaping
                a brighter future together!
              </CardDescription>
            </CardHeader>
          </div>
          {/* Image Section */}
          <div className="relative hidden bg-none md:block">
            <img
              src={greetingCardImg}
              alt="standing-infront-of-dashboard"
              className="absolute h-full w-full object-cover transition-transform duration-500 ease-in-out hover:scale-105"
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
