"use client";
import { useMemo } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "../../../components/ui/chart";
import "./eventoverviewchart.css";

export const title = "Events Played This Year";

// Enhanced color palette using primary, tertiary, and accent colors for visual appeal
const CHART_FULL_DATA = [
  { month: "January", Games: 5, fill: "var(--colour-primary)", label: "Jan" },
  {
    month: "February",
    Games: 3,
    fill: "var(--colour-primary-500)",
    label: "Feb",
  },
  { month: "March", Games: 2, fill: "var(--colour-primary-700)", label: "Mar" },
  { month: "April", Games: 7, fill: "var(--colour-tertiary)", label: "Apr" },
  { month: "May", Games: 2, fill: "var(--colour-tertiary-500)", label: "May" },
  { month: "June", Games: 2, fill: "var(--colour-tertiary-700)", label: "Jun" },
  { month: "July", Games: 5, fill: "var(--colour-accent)", label: "Jul" },
  { month: "August", Games: 1, fill: "var(--colour-accent-500)", label: "Aug" },
  {
    month: "September",
    Games: 8,
    fill: "var(--colour-accent-700)",
    label: "Sep",
  },
  {
    month: "October",
    Games: 6,
    fill: "var(--colour-primary-300)",
    label: "Oct",
  },
  {
    month: "November",
    Games: 3,
    fill: "var(--colour-tertiary-300)",
    label: "Nov",
  },
  {
    month: "December",
    Games: 2,
    fill: "var(--colour-accent-300)",
    label: "Dec",
  },
];

const MONTH_LABELS = {
  January: { label: "Jan" },
  February: { label: "Feb" },
  March: { label: "Mar" },
  April: { label: "Apr" },
  May: { label: "May" },
  June: { label: "Jun" },
  July: { label: "Jul" },
  August: { label: "Aug" },
  September: { label: "Sep" },
  October: { label: "Oct" },
  November: { label: "Nov" },
  December: { label: "Dec" },
};

/** Return range string starting from Jan until current month (e.g. "Jan 2025 - Nov 2025") */
function formatMonthRange(startMonth = "January") {
  const now = new Date();
  const endMonth = now.toLocaleString(undefined, { month: "long" });
  const year = now.getFullYear();
  return `${startMonth} ${year} - ${endMonth} ${year}`;
}

export default function EventOverviewChart(): React.JSX.Element {
  // Determine current month index (0-based). Keep only months from January up to current month.
  const currentMonthIndex = useMemo(() => new Date().getMonth(), []);
  const visibleData = useMemo(
    () => CHART_FULL_DATA.slice(0, currentMonthIndex + 1),
    [currentMonthIndex]
  );

  // Sum of visible games (used as center label)
  const totalGames = useMemo(
    () => visibleData.reduce((sum, d) => sum + (d.Games ?? 0), 0),
    [visibleData]
  );

  // Calculate percentage for each month
  const dataWithPercentages = useMemo(
    () =>
      visibleData.map((item) => ({
        ...item,
        percentage:
          totalGames > 0 ? ((item.Games / totalGames) * 100).toFixed(1) : "0",
      })),
    [visibleData, totalGames]
  );

  return (
    <div className="event-chart-root" role="region" aria-label={title}>
      <div className="event-chart__header">
        <h2 className="event-chart__title">{title}</h2>
        <p className="event-chart__subtitle">{formatMonthRange("January")}</p>
      </div>

      <div className="event-chart__content">
        <ChartContainer
          className="event-chart__chart-container"
          config={MONTH_LABELS}
        >
          <ResponsiveContainer
            width="100%"
            height="100%"
            minHeight={180}
            aspect={1}
          >
            <PieChart className="event-chart__chart">
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent hideLabel />}
              />
              <Pie
                className="event-chart__pie"
                data={dataWithPercentages}
                dataKey="Games"
                nameKey="month"
                cx="50%"
                cy="50%"
                innerRadius="35%"
                outerRadius="75%"
                paddingAngle={2}
                startAngle={0}
                endAngle={360}
                animationBegin={0}
                animationDuration={800}
                animationEasing="ease-out"
              >
                {dataWithPercentages.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={entry.fill}
                    stroke="var(--chart-background)"
                    strokeWidth={2}
                  />
                ))}
              </Pie>

              {/* Center label */}
              <text
                className="event-chart__center-text"
                x="50%"
                y="50%"
                textAnchor="middle"
                dominantBaseline="middle"
              >
                <tspan
                  className="event-chart__center-value"
                  x="50%"
                  y="50%"
                  dy="-8px"
                >
                  {totalGames}
                </tspan>
                <tspan
                  className="event-chart__center-label"
                  x="50%"
                  y="50%"
                  dy="16px"
                >
                  Games
                </tspan>
              </text>
            </PieChart>
          </ResponsiveContainer>
        </ChartContainer>

        {/* Custom Legend */}
        <div className="event-chart__legend">
          <div className="event-chart__legend-items">
            {dataWithPercentages.map((entry) => (
              <div
                key={entry.month}
                className="event-chart__legend-item"
                role="button"
                tabIndex={0}
                aria-label={`${entry.month}: ${entry.Games} games (${entry.percentage}%)`}
              >
                <div
                  className="event-chart__legend-color"
                  style={{ backgroundColor: entry.fill }}
                />
                <span className="event-chart__legend-text">
                  {entry.label}: {entry.Games} ({entry.percentage}%)
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
