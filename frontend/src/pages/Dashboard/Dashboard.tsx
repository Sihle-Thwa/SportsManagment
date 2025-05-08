// src/pages/Dashboard.tsx
import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Users } from "lucide-react";
import { CardGreeting } from "@/components/common/Card/CardGreeting";
import { CardStat } from "@/components/common/Card/CardStat";
import { statsdata } from "@/routes/statsdata";

const Dashboard: React.FC = () => {
  return (
    <div className="space-y-3">
      

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <div className="col-span-4">
          <CardGreeting />
        </div>

        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Latest user actions and events</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="flex items-center gap-4">
                  <div className="h-8 w-8 rounded-full bg-gray-100 flex items-center justify-center">
                    <Users className="h-4 w-4 text-gray-600" />
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-medium">
                      User {i} performed an action
                    </p>
                    <p className="text-xs text-gray-500">
                      {i * 10} minutes ago
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
      <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-4">
        {/* Stat Cards */}
        {statsdata.map((stat, index) => (
          <CardStat
            key={index}
            title={stat.title}
            value={stat.value}
            icon={stat.icon}
          />
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
