"use client";
import { useMemo } from "react";
import { PieChart, Pie, Cell, Legend, ResponsiveContainer } from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "../../../components/ui/chart";
import "./eventoverviewchart.css";

export const title = "Events Played This Year";

const CHART_FULL_DATA = [
  { month: "January", Games: 5, fill: "var(--colour-primary)" },
  { month: "February", Games: 3, fill: "var(--colour-primary-300)" },
  { month: "March", Games: 2, fill: "var(--colour-primary-500)" },
  { month: "April", Games: 7, fill: "var(--colour-primary-600)" },
  { month: "May", Games: 2, fill: "var(--colour-primary-700)" },
  { month: "June", Games: 2, fill: "var(--colour-primary-800)" },
  { month: "July", Games: 5, fill: "var(--colour-primary-900)" },
  { month: "August", Games: 1, fill: "var(--colour-secondary-100)" },
  { month: "September", Games: 8, fill: "var(--colour-secondary-300)" },
  { month: "October", Games: 6, fill: "var(--colour-secondary-700)" },
  { month: "November", Games: 3, fill: "var(--colour-secondary-800)" },
  { month: "December", Games: 2, fill: "var(--colour-secondary-900)" },
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

  return (
    <div className="radialBarChart-Root" role="region" aria-label={title}>
      <div className="radialBarChart-Header">
        <div className="radialBarChart-Header__Heading">{title}</div>
        <div className="radialBarChart-Header__Subheading">
          {formatMonthRange("January")}
        </div>
      </div>
      <div className="radialBarChart-Content">
        <ChartContainer
          className="radialBarChart-Container"
          config={MONTH_LABELS}
        >
          <ResponsiveContainer width="100%" height={320}>
            <PieChart>
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent hideLabel />}
              />
              <Pie
                data={visibleData}
                dataKey="Games"
                nameKey="month"
                cx="50%"
                cy="50%"
                innerRadius="70%"
                outerRadius="100%"
                paddingAngle={2}
                isAnimationActive={true}
                labelLine={false}
                // labels are omitted — legend + center text provide info
              >
                {visibleData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.fill} />
                ))}
              </Pie>
              <text
                x="40%"
                y="50%"
                textAnchor="middle"
                dominantBaseline="middle"
                className="radialBarChart-CenterLabel__Text"
              >
                <tspan className="radialBarChart-CenterLabel__Value">
                  {totalGames}
                </tspan>
                <tspan
                  className="radialBarChart-CenterLabel__Unit"
                  x="50%"
                  dy="22px"
                >
                  Games
                </tspan>
              </text>

              <Legend
                verticalAlign="middle"
                align="right"
                layout="vertical"
                wrapperStyle={{ right: 0, top: 0, lineHeight: "24px" }}
              />
            </PieChart>
          </ResponsiveContainer>
        </ChartContainer>
      </div>
    </div>
  );
}
