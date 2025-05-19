import { Card, CardContent, CardTitle } from "@/components/ui/card";
import React from "react";

export const CardStat: React.FC<{
  title: string;
  value: string;
  icon: React.ReactNode;
  className?: string;
}> = ({ title, value, icon }) => (

  <div className="flex flex-col w-72 md:w-96 lg:w-1/4 ">
    <Card className="flex items-start p-3">
      <CardContent className="flex p-3 md:grid-cols-2 w-max">
        <div className="flex p-3 items-center h-16 w-16 rounded-full bg-bg-amber-300 text-amber-500">
          {icon}
        </div>

        <div className="flex flex-col items-start p-3 md:p-3">
          <div className="text-2xl font-bold">{value}</div>
          <CardTitle className="text-sm font-normal">{title}</CardTitle>
        </div>
      </CardContent>
    </Card>
  </div>
);
