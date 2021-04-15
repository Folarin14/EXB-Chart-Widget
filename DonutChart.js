import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";

const DonutChart = () => {
  const chartRef = useRef(null);

  useEffect(() => {
    const myChartRef = chartRef.current.getContext("2d");
    new Chart(myChartRef, {
      type: "doughnut",

      data: {
        datasets: [
          {
            label: "Dataset 1",
            data: [40, 20, 20, 5, 5, 10],
            backgroundColor: ["#FFFE54", "#854693", "#EB3223", "#731425", "#F08432", "#68DF43"],
          },
        ],
      },
      // options: {
      //   borderColor: "transparent",
      // },
      options: {
        plugins: {
          datalabels: {
            display: true,
            align: "bottom",
            backgroundColor: "#ccc",
            borderRadius: 3,
            font: {
              size: 18,
            },
          },
        },
      },
    });
  });

  return (
    <div>
      <canvas id="myChart" ref={chartRef} />
    </div>
  );
};

export default DonutChart;
