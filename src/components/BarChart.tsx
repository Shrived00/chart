import React from "react";
import ReactApexChart from "react-apexcharts";
import { ApexOptions } from "apexcharts";

interface ChartDataSeries {
    name: string;
    data: number[];
}

interface ChartData {
    series: ChartDataSeries[];
    options: ApexOptions;
}

const BarChart: React.FC = () => {
    const chartData: ChartData = {
        series: [
            {
                name: "Company B",
                data: [35, 22, -48, 4, -12, -18, 8, 10],
            },
            {
                name: "Company A",
                data: [45, -32, 18, 24, -12, 38, -26, 10],
            },
        ],
        options: {
            chart: {
                type: "bar",
                height: 350,
                zoom: {
                    enabled: true,
                },
                toolbar: {
                    autoSelected: "zoom",
                    tools: {
                        zoom: true,
                        pan: false,
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
            plotOptions: {
                bar: {
                    horizontal: false,
                    columnWidth: "55%",
                    borderRadius: 4, // Adding borderRadius for rounded corners
                },
            },
            dataLabels: {
                enabled: false,
            },
            xaxis: {
                categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug"],
                tickPlacement: "on",
                labels: {
                    style: {
                        colors: '#FFFFFF',
                    },
                },
            },
            yaxis: {
                title: {
                    text: "Profit/Loss",
                },
                labels: {
                    formatter: function (value: number) {
                        return value.toFixed(0);
                    },
                    style: {
                        colors: '#FFFFFF',
                    },
                },
            },
            legend: {
                labels: {
                    colors: '#FFFFFF',
                },
            },
            title: {
                text: "Monthly Net Profit/Loss",
                align: "left",
                style: {
                    color: '#FFFFFF',
                },
            },
            tooltip: {
                y: {
                    formatter: function (val: number) {
                        return val + "K";
                    }
                },
            },
            grid: {
                borderColor: "#f1f1f1",
            },
        },
    };

    return (
        <div className="bg-neutral-900 text-white flex flex-col items-center justify-center w-full h-screen ">
            <div className="w-full sm:w-3/4 lg:w-1/2 border mt-20">
                <ReactApexChart
                    options={chartData.options}
                    series={chartData.series}
                    type="bar"
                    width="100%"
                />
            </div>

            <div className="mt-10 text-left ">
                <div className="text-lg">Features:</div>

                <div>✨Zoom</div>
                <div>✨Reset</div>
                <div>✨Positive and Negative Values</div>
            </div>
        </div>
    );
};

export default BarChart;