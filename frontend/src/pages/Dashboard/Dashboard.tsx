// src/pages/Dashboard.tsx
import React from "react";
import { CardGreeting } from "@/components/common/Card/CardGreeting";
import { CardStat } from "@/components/common/Card/CardStat";
import { statsdata } from "@/routes/statsdata";
import { CardCalendar } from "@/components/common/Card/CardCalendar";

const Dashboard: React.FC = () => {
  return (
    <div className="space-y-3">
      <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-8">
        <div className="col-span-2 lg:col-span-4">
          <CardGreeting />
        </div>
        <div className="col-span-2">
          <CardCalendar />
        </div>

        
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
