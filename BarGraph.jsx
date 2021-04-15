import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";

const BarGraph = () => {
  const chartRef = useRef(null);

  useEffect(() => {
    const myChartRef = chartRef.current.getContext("2d");
    new Chart(myChartRef, {
      type: "bar",
      data: {
        labels: [
          "1am",
          "6am",
          "12pm",
          "6pm",
          "1am",
          "6am",
          "12pm",
          "6pm",
          "1am",
          "6am",
          "12pm",
          "6pm",
          "1am",
          "6am",
          "12pm",
          "6pm",
          "1am",
          "6am",
          "12pm",
          "6pm",
          "1am",
          "6am",
          "12pm",
          "6pm",
        ],
        datasets: [
          {
            label: "Dataset 1",
            data: [
              40,
              30,
              60,
              70,
              50,
              60,
              40,
              30,
              60,
              70,
              50,
              60,
              40,
              30,
              60,
              70,
              50,
              60,
              40,
              30,
              60,
              70,
              50,
              60,
            ],
            // borderColor: Utils.CHART_COLORS.red,
            backgroundColor: ["#EB3223", "#F08432"],
          },
        ],
      },
      options: {
        responsive: true,
      },
    });
  });

  return (
    <div>
      <canvas id="myChart" ref={chartRef} />
    </div>
  );
};

console.log(chartRef);

export default BarGraph;
