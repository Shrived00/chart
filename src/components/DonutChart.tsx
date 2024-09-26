
import * as React from "react";
import { Label, Pie, PieChart, Sector } from "recharts";
import { PieSectorDataItem } from "recharts/types/polar/Pie";

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    ChartConfig,
    ChartContainer,
    ChartStyle,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart";

export const description = "An interactive pie chart";

const desktopData = [
    { month: "january", desktop: 186, fill: "var(--color-january)" },
    { month: "february", desktop: 305, fill: "var(--color-february)" },
    { month: "march", desktop: 237, fill: "var(--color-march)" },
    { month: "april", desktop: 173, fill: "var(--color-april)" },
    { month: "may", desktop: 209, fill: "var(--color-may)" },
];

const chartConfig = {
    visitors: {
        label: "Visitors",
    },
    desktop: {
        label: "Desktop",
    },
    january: {
        label: "January",
        color: "hsl(var(--chart-1))",
    },
    february: {
        label: "February",
        color: "hsl(var(--chart-2))",
    },
    march: {
        label: "March",
        color: "hsl(var(--chart-3))",
    },
    april: {
        label: "April",
        color: "hsl(var(--chart-4))",
    },
    may: {
        label: "May",
        color: "hsl(var(--chart-5))",
    },
} satisfies ChartConfig;

export function DonutChart() {
    const id = "pie-interactive";
    const [activeMonth, setActiveMonth] = React.useState(desktopData[0].month);

    const activeIndex = React.useMemo(
        () => desktopData.findIndex((item) => item.month === activeMonth),
        [activeMonth]
    );

    return (
        <Card data-chart={id} className="flex flex-col">
            <ChartStyle id={id} config={chartConfig} />
            <CardHeader className="flex-row items-start space-y-0 pb-0">
                <div className="grid gap-1">
                    <CardTitle>Pie Chart - Interactive</CardTitle>
                    <CardDescription>January - June 2024</CardDescription>
                </div>
            </CardHeader>
            <CardContent className="flex flex-1 justify-center pb-0">
                <ChartContainer
                    id={id}
                    config={chartConfig}
                    className="mx-auto aspect-square w-full max-w-[300px]"
                >
                    <PieChart>
                        <ChartTooltip
                            cursor={false}
                            content={<ChartTooltipContent hideLabel />}
                        />
                        <Pie
                            data={desktopData}
                            dataKey="desktop"
                            nameKey="month"
                            innerRadius={60}
                            strokeWidth={5}
                            activeIndex={activeIndex}
                            onMouseEnter={(_, index) => {
                                setActiveMonth(desktopData[index].month);
                            }}
                            activeShape={(props: PieSectorDataItem) => (
                                <g>
                                    <Sector {...props} outerRadius={props.outerRadius! + 10} />
                                    <Sector
                                        {...props}
                                        outerRadius={props.outerRadius! + 25}
                                        innerRadius={props.outerRadius! + 12}
                                    />
                                </g>
                            )}
                        >
                            <Label
                                content={({ viewBox }) => {
                                    if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                                        return (
                                            <text
                                                x={viewBox.cx}
                                                y={viewBox.cy}
                                                textAnchor="middle"
                                                dominantBaseline="middle"
                                            >
                                                <tspan
                                                    x={viewBox.cx}
                                                    y={viewBox.cy}
                                                    className="fill-foreground text-3xl font-bold"
                                                >
                                                    {desktopData[activeIndex].desktop.toLocaleString()}
                                                </tspan>
                                                <tspan
                                                    x={viewBox.cx}
                                                    y={(viewBox.cy || 0) + 24}
                                                    className="fill-muted-foreground"
                                                >
                                                    Visitors
                                                </tspan>
                                            </text>
                                        );
                                    }
                                }}
                            />
                        </Pie>
                    </PieChart>
                </ChartContainer>
            </CardContent>
        </Card>
    );
}
