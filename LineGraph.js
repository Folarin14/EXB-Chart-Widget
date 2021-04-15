import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";

//POINT STYLES
// "circle";
// "cross";
// "crossRot";
// "dash";
// "line";
// "rect";
// "rectRounded";
// "rectRot";
// "star";
// "triangle";

const LineGraph = () => {
  const chartRef = useRef(null);

  useEffect(() => {
    const myChartRef = chartRef.current.getContext("2d");
    new Chart(myChartRef, {
      type: "line",
      data: {
        labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
        datasets: [
          {
            label: "Dubai",
            data: [3, 4, 6, 8, 12, 16, 17, 16.5, 14, 11, 7, 5],
            // borderColor: Utils.CHART_COLORS.red,
            backgroundColor: ["#C10230"],
            borderColor: "#C10230",
            pointStyle: "star",
            pointRadius: 6,
          },
          {
            label: "Abu Dhabi",
            data: [6, 8, 12, 16, 24, 32, 34, 33, 28, 22, 14, 10],
            // borderColor: Utils.CHART_COLORS.red,
            backgroundColor: ["#E0B624"],
            borderColor: "#E0B624",
            pointStyle: "rect",
            pointRadius: 6,
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: "bottom",
          },
          title: {
            display: true,
            text: "AQI for Location, Date",
            fullSize: true,
            font: {
              size: "24px",
              lineHeight: 2.5,
            },
          },
        },
      },
    });
  });

  return (
    <div className="bg-white">
      <canvas id="myChart" ref={chartRef} />
    </div>
  );
};

export default LineGraph;
