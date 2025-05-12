// src/pages/Dashboard.tsx
import React from "react";
import { CardGreeting } from "@/components/common/Card/CardGreeting";
import { CardStat } from "@/components/common/Card/CardStat";
import { statsdata } from "@/routes/statsdata";
import { CardCalendar } from "@/components/common/Card/CardCalendar";
import MessageDashboard from "@/components/dashboard/MessageDashboard";
import NoticeBoard from "@/components/dashboard/NoticeBoard";

const Dashboard: React.FC = () => {
  return (
    <div className="space-y-3">
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-10">
        <div className="col-span-1 lg:col-span-6">
          <CardGreeting />
        </div>
        <div className="col-span-1 lg:col-span-4">
          <NoticeBoard />
        </div>

      </div>
      <div className="grid gap-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4">
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
      <div className="grid gap-2 md:grid-cols-6 lg:grid-cols-9">
        <div className="col-span-1 md:grid-cols-2 lg:col-span-3">
          <MessageDashboard />
        </div>
        <div className="col-span-1 md:grid-cols-2 lg:col-span-3">
          <CardCalendar />
        </div>
        <div className="col-span-1 md:grid-cols-2 lg:col-span-3">

        </div>
      </div>
    </div>
  );
};

export default Dashboard;
