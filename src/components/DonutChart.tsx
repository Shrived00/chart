import * as React from "react"
import { Label, Pie, PieChart, Sector } from "recharts"
import { PieSectorDataItem } from "recharts/types/polar/Pie"
import { motion, AnimatePresence } from "framer-motion" // Import AnimatePresence for modal transitions
import { Bar, BarChart, CartesianGrid, Rectangle, XAxis } from "recharts"

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    ChartConfig,
    ChartContainer,
    ChartStyle,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart"
import { TrendingUp } from "lucide-react"

export const description = "An interactive pie chart"

const desktopData = [
    { month: "january", desktop: 186, fill: "#FF5733" }, // Replace var colors with actual hex for testing
    { month: "february", desktop: 305, fill: "#33FF57" },
    { month: "march", desktop: 237, fill: "#3357FF" },
    { month: "april", desktop: 173, fill: "#F333FF" },
    { month: "may", desktop: 209, fill: "#FFC300" },
]

const chartConfig = {
    visitors: { label: "Visitors" },
    desktop: { label: "Desktop" },
    january: { label: "January", color: "#FF5733" },
    february: { label: "February", color: "#33FF57" },
    march: { label: "March", color: "#3357FF" },
    april: { label: "April", color: "#F333FF" },
    may: { label: "May", color: "#FFC300" },
} satisfies ChartConfig

const chartData2 = [
    { browser: "chrome", visitors: 187, fill: "#FF5733" },
    { browser: "safari", visitors: 200, fill: "#33FF57" },
    { browser: "firefox", visitors: 275, fill: "#3357FF" },
    { browser: "edge", visitors: 173, fill: "#F333FF" },
    { browser: "other", visitors: 90, fill: "#FFC300" },
]
const chartConfig2 = {
    visitors: { label: "Visitors" },
    chrome: { label: "Chrome", color: "#FF5733" },
    safari: { label: "Safari", color: "#33FF57" },
    firefox: { label: "Firefox", color: "#3357FF" },
    edge: { label: "Edge", color: "#F333FF" },
    other: { label: "Other", color: "#FFC300" },
} satisfies ChartConfig

export function DonutChart() {
    const id = "pie-interactive"
    const [activeMonth, setActiveMonth] = React.useState(desktopData[0].month)
    const [isModalOpen, setIsModalOpen] = React.useState(false)

    const activeIndex = React.useMemo(
        () => desktopData.findIndex((item) => item.month === activeMonth),
        [activeMonth]
    )

    const handleSectorClick = (month: string) => {
        setActiveMonth(month)
        setIsModalOpen(true)
    }

    return (


        <div className="bg-neutral-900 text-white mt-20 flex items-center justify-center">
            <Card data-chart={id} className="flex flex-col bg-netral-900 text-white   px-2 max-w-[30rem] border rounded-none p-3">
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
                        className="mx-auto aspect-square w-full max"
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
                                activeShape={(props: PieSectorDataItem) => (
                                    <g>
                                        <Sector {...props} outerRadius={(props.outerRadius ?? 0) + 10} />
                                        <Sector
                                            {...props}
                                            outerRadius={(props.outerRadius ?? 0) + 25}
                                            innerRadius={(props.outerRadius ?? 0) + 12}
                                        />

                                    </g>
                                )}
                                onClick={(_, index) => {
                                    handleSectorClick(desktopData[index].month)
                                }}
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
                                                        className="fill-foreground text-3xl font-bold text-white"
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
                                            )
                                        }
                                        return null
                                    }}
                                />
                            </Pie>
                        </PieChart>
                    </ChartContainer>
                </CardContent>

                <AnimatePresence>
                    {isModalOpen && (
                        <motion.div
                            className="fixed top-0 left-0 z-50 flex items-center justify-center w-full h-full bg-black bg-opacity-50"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                        >
                            <motion.div
                                className="bg-white p-4 rounded-lg shadow-lg text-black"
                                initial={{ scale: 0.8 }}
                                animate={{ scale: 1 }}
                                exit={{ scale: 0.8 }}
                            >
                                <h2 className="text-xl font-bold uppercase">{activeMonth}</h2>
                                <span>Data for {activeMonth}:</span>
                                <span>{desktopData[activeIndex].desktop.toLocaleString()} Visitors</span>

                                {/* Bar Chart Inside Modal */}
                                <Card className="mt-6">
                                    <CardHeader>
                                        <CardTitle>Bar Chart - Active</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <ChartContainer config={chartConfig2}>
                                            <BarChart accessibilityLayer data={chartData2}>
                                                <CartesianGrid vertical={false} />
                                                <XAxis
                                                    dataKey="browser"
                                                    tickLine={false}
                                                    tickMargin={10}
                                                    axisLine={false}
                                                    tickFormatter={(value) =>
                                                        chartConfig2[value as keyof typeof chartConfig2]
                                                            ?.label
                                                    }
                                                />
                                                <ChartTooltip
                                                    cursor={false}
                                                    content={<ChartTooltipContent hideLabel />}
                                                />
                                                <Bar
                                                    dataKey="visitors"
                                                    fill="#8884d8"
                                                    strokeWidth={2}
                                                    radius={8}
                                                    activeIndex={2}
                                                    activeBar={({ ...props }) => (
                                                        <Rectangle
                                                            {...props}
                                                            fillOpacity={0.8}
                                                            stroke={props.payload.fill}
                                                            strokeDasharray={4}
                                                            strokeDashoffset={4}
                                                        />
                                                    )}
                                                />
                                            </BarChart>
                                        </ChartContainer>
                                    </CardContent>
                                    <CardFooter className="flex-col items-start gap-2 text-sm">
                                        <div className="flex gap-2 font-medium leading-none">
                                            Trending up by 5.2% this month{" "}
                                            <TrendingUp className="h-4 w-4" />
                                        </div>

                                    </CardFooter>
                                </Card>

                                <button
                                    onClick={() => setIsModalOpen(false)}
                                    className="mt-2 text-blue-500 underline"
                                >
                                    Close
                                </button>
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>

                <div className=" text-left">
                    <div className="text-lg">
                        Features:
                    </div>

                    <div>
                        ✨On CLick Modal
                    </div>

                </div>
            </Card>


        </div>
    )
}
