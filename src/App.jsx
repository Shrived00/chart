import ReactApexChart from "react-apexcharts";

export default function App() {
  const chartData = {
    series: [
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
    ],
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
            pan: true,
            zoom: true,
            reset: true,
          },
        },
      },
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
          color: '#FFFFFF' // Your desired color
        }
      },
      legend: {
        tooltipHoverFormatter: function (val, opts) {
          return (
            val +
            " - <strong>" +
            opts.w.globals.series[opts.seriesIndex][opts.dataPointIndex] +
            "</strong>"
          );
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
            colors: '#FFFFFF',
          }
        },
        tickPlacement: "on",
      },
      yaxis: {
        labels: {
          style: {
            colors: '#FFFFFF', // Your desired color
          }
        }
      },
      tooltip: {
        y: [
          {
            title: {
              formatter: function (val) {
                return val + " (mins)";
              },
            },
          },
          {
            title: {
              formatter: function (val) {
                return val + " per session";
              },
            },
          },
          {
            title: {
              formatter: function (val) {
                return val;
              },
            },
          },
        ],
        style: {
          fontSize: '12px',
          fontFamily: undefined,
          colors: '#00000'
        },

      },
      grid: {
        borderColor: "#f1f1f1",
      },
    },
  };

  return (
    <div className="bg-neutral-900 text-white flex items-center justify-center" >
      <div className="">
        <div className="">
          <ReactApexChart
            options={chartData.options}
            series={chartData.series}
            type="line"
            width="500"
          />
        </div>
      </div>
    </div >
  );
}
