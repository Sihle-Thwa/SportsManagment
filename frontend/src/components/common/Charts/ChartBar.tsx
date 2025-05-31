import { Car, TrendingUp } from "lucide-react";

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "../../ui/card";

import {
    ChartConfig,
    ChartContainer,
    ChartLegend,
    ChartLegendContent,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart";

import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

export const description = "A bar chart displaying player statistics.";

const chartData = [
    { month: "January", desktop: 186, mobile: 80 },
    { month: "February", desktop: 305, mobile: 200 },
    { month: "March", desktop: 237, mobile: 120 },
    { month: "April", desktop: 73, mobile: 190 },
    { month: "May", desktop: 209, mobile: 130 },
    { month: "June", desktop: 214, mobile: 140 },
]
const chartConfig = {
    desktop: {
        label: "Desktop",
        color: "var(--chart-1)",
    },
    mobile: {
        label: "Mobile",
        color: "var(--chart-2)",
    },
} satisfies ChartConfig

export function ChartBar() {

    return (
        <Card className="card-base">
            <CardHeader className="card-header">
                <CardTitle className="card-title">Player Statistics</CardTitle>
                <CardDescription className="card-description">
                    A bar chart displaying player scores.
                </CardDescription>
            </CardHeader>
            <CardContent className="card-body">
                <ChartContainer config={chartConfig} >


                </ChartContainer>

            </CardContent>
        </Card>
    );
};


