// src/pages/Dashboard.tsx
import React from "react";
import { CardGreeting } from "../../components/dashboard/CardGreeting";
import { CardStat } from "@/components/dashboard/CardStat";
import { statsdata } from "@/routes/statsdata";
import { CardCalendar } from "@/components/common/Card/CardCalendar";
import MessageDashboard from "@/components/dashboard/MessageDashboard";
import NoticeBoard from "@/components/dashboard/NoticeBoard";

const Dashboard: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex gap-6 ">
        <div className="flex-9/12 ">
          <CardGreeting />
        </div>
        <div className="flex-1/4 ">
          <NoticeBoard />
        </div>

      </div>
      <div className="flex gap-6">
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
      <div className="flex gap-6 md:grid-cols-6 lg:grid-cols-9">
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
