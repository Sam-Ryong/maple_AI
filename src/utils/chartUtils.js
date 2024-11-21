// src/utils/chartUtils.js

export const createChartOptions = (initialValueRef) => {
  return {
    responsive: true,
    maintainAspectRatio: true,
    scales: {
      x: { type: "linear", position: "bottom" },
      y: { beginAtZero: false, min: initialValueRef.current || 0 },
    },
    legend: {
      display: false,
    },
  };
};

export const createChartData = (updatedData, prevData) => {
  return {
    ...prevData,
    labels: [...prevData.labels, prevData.labels.length + 1],
    datasets: [
      {
        ...prevData.datasets[0],
        data: updatedData,
      },
    ],
  };
};
