"use client";
import { RadialBarChart, RadialBar, Legend } from "recharts";
import "./eventoverviewchart.css";

export const title = "Events Played This Year";
export const description = "An overview of events played this year.";

const chartMockData = [
  { month: "January", Games: 186 },
  { month: "February", Games: 305 },
  { month: "March", Games: 237 },
  { month: "April", Games: 73 },
  { month: "May", Games: 209 },
  { month: "June", Games: 214 },
  { month: "July", Games: 150 },
  { month: "August", Games: 180 },
  { month: "September", Games: 220 },
  { month: "October", Games: 240 },
  { month: "November", Games: 260 },
];

const EventOverviewChart = () => {
  return (
    <RadialBarChart
      style={{
        width: "100%",
        maxWidth: "400px",
        height: "100%",
        maxHeight: "600px",
        aspectRatio: 1,
        responsive: "true",
      }}
      cx="50%"
      data={chartMockData}
    >
      <RadialBar
        label={{ position: "insideStart", fill: "#fff" }}
        background
        dataKey="Games"
      />
      <Legend
        iconSize={12}
        layout="vertical"
        verticalAlign="middle"
        style={{ right: "0", top: "50" }}
      />
    </RadialBarChart>
  );
};

export default EventOverviewChart;
