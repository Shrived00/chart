import React, { useState } from "react";
import ReactApexChart from "react-apexcharts";
import { ApexOptions } from "apexcharts";

interface ChartData {
    name: string;
    data: number[];
}

const LineChart: React.FC = () => {
    const [device, setDevice] = useState<"Desktop" | "Mobile">("Desktop");

    const getChartDataForDevice = (): ChartData[] => {
        if (device === "Desktop") {
            return [
                {
                    name: "Session Duration",
                    data: [45, 52, 38, 24, 33, 26, 21, 20, 6, 8, 15, 10],
                },
                {
                    name: "Page Views",
                    data: [35, 41, 62, 42, 13, 18, 29, 37, 36, 51, 32, 35],
                },
                {
                    name: "Total Visits",
                    data: [87, 57, 74, 99, 75, 38, 62, 47, 82, 56, 45, 47],
                },
            ];
        } else {
            // Different data for Mobile
            return [
                {
                    name: "Session Duration",
                    data: [12, 18, 25, 29, 32, 21, 24, 35, 28, 30, 33, 25],
                },
                {
                    name: "Page Views",
                    data: [22, 35, 38, 42, 18, 20, 33, 37, 40, 42, 35, 38],
                },
                {
                    name: "Total Visits",
                    data: [67, 57, 65, 80, 55, 38, 62, 47, 82, 56, 45, 47],
                },
            ];
        }
    };

    const chartData: { series: ChartData[]; options: ApexOptions } = {
        series: getChartDataForDevice(),
        options: {
            chart: {
                height: 350,
                type: "line",
                zoom: {
                    enabled: true,
                },
                toolbar: {
                    autoSelected: "zoom",
                    tools: {
                        pan: false,
                        zoom: true,
                        reset: true,
                        download: false,
                    },
                },
            },
            responsive: [
                {
                    breakpoint: 1024,
                    options: {
                        chart: {
                            width: "100%",
                        },
                        legend: {
                            position: "bottom",
                        },
                    },
                },
                {
                    breakpoint: 768,
                    options: {
                        chart: {
                            width: "100%",
                        },
                        legend: {
                            position: "bottom",
                        },
                    },
                },
            ],
            dataLabels: {
                enabled: false,
            },
            stroke: {
                width: [5, 7, 5],
                curve: "straight",
                dashArray: [0, 8, 5],
            },
            title: {
                text: "Page Statistics",
                align: "left",
                style: {
                    color: "#FFFFFF",
                },
            },
            legend: {
                tooltipHoverFormatter: function (val: string, opts: any) {
                    return (
                        val +
                        " - <strong>" +
                        opts.w.globals.series[opts.seriesIndex][opts.dataPointIndex] +
                        "</strong>"
                    );
                },
                labels: {
                    colors: "#FFFFFF",
                },
            },
            markers: {
                size: 0,
                hover: {
                    sizeOffset: 6,
                },
            },
            xaxis: {
                categories: [
                    "Jan",
                    "Feb",
                    "Mar",
                    "Apr",
                    "May",
                    "Jun",
                    "Jul",
                    "Aug",
                    "Sep",
                    "Oct",
                    "Nov",
                    "Dec",
                ],
                labels: {
                    style: {
                        colors: "#FFFFFF",
                    },
                },
                tickPlacement: "on",
            },
            yaxis: {
                labels: {
                    style: {
                        colors: "#FFFFFF",
                    },
                },
            },
            tooltip: {
                y: [
                    {
                        title: {
                            formatter: function (val: string) {
                                return val + " (mins)";
                            },
                        },
                    },
                    {
                        title: {
                            formatter: function (val: string) {
                                return val + " per session";
                            },
                        },
                    },
                    {
                        title: {
                            formatter: function (val: string) {
                                return val;
                            },
                        },
                    },
                ],
            },
            grid: {
                borderColor: "#f1f1f1",
            },
        },
    };

    return (
        <div className="bg-neutral-900 text-white flex flex-col items-center justify-center w-full h-screen">
            <div className="w-full sm:w-3/4 lg:w-1/2 border ">
                <div className="border-b flex h-[5rem] justify-between  items-center mb-3">
                    <div className="pl-3">
                        <div className="text-lg font-semibold">
                            Bar Chart - Interactive
                        </div>
                        <div className="text-sm">
                            Showing total visitors for the last 12 months
                        </div>
                    </div>
                    <div className="flex h-full  ">
                        <div
                            className={`cursor-pointer h-full px-5 flex items-center justify-center border-l
              ${device === "Desktop" ? 'bg-neutral-800 ' : ''} 
              hover:bg-neutral-800 hover:underline `}
                            onClick={() => setDevice("Desktop")}
                        >
                            Desktop
                        </div>

                        <div className="cursor-pointer 
                        h-full flex px-5  items-center justify-center  border-l
                        hover:bg-neutral-800 hover:underline" onClick={() => setDevice("Mobile")}>
                            Mobile
                        </div>
                    </div>
                </div>

                <ReactApexChart
                    options={chartData.options}
                    series={chartData.series}
                    type="line"
                    width="100%"
                />

            </div>
            <div className="mt-10 text-left">
                <div className="text-lg">
                    Features:
                </div>

                <div>
                    ✨Zoom
                </div>
                <div>
                    ✨Reset
                </div>
                <div>
                    ✨Select which stat to see
                </div>
            </div>
        </div>
    );
};

export default LineChart;