// src/components/Chart.js
import React from "react";
import { Line } from "react-chartjs-2";
import {
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Chart as ChartJS,
} from "chart.js";

// Register chart components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip
);

const Chart = ({ chartData, resultChartOptions }) => {
  return (
    <div
      className="chart-container"
      style={{ width: "320px", height: "160px", margin: "30" }}
    >
      <Line data={chartData} options={resultChartOptions} />
    </div>
  );
};

export default Chart;
