import React from "react";
import { Bar } from "react-chartjs-2";

const BarChart = ({ x, y }) => {
  const labels = x;
  const data = {
    labels: labels,
    datasets: [
      {
        label: "Y",
        backgroundColor: [
          "rgba(54, 162, 235, 0.6)",
          "rgba(75, 192, 192, 0.6)",
          "rgba(153, 102, 255, 0.6)",
        ],
        data: y,
        barPercentage: 1, // відсутність відступів між стовпцями
        categoryPercentage: 1, // відсутність відступів між стовпцями
      },
    ],
  };

  return (
    <div>
      <Bar
        data={data}
        options={{
          scales: {
            xAxes: [
              {
                ticks: {
                  autoSkip: false, // вимикає автоматичне пропускання позначок
                },
              },
            ],
          },
          title: {
            display: true,
            text: "Bar Chart",
            fontSize: 20,
          },
          legend: {
            display: true,
            position: "right",
          },
        }}
      />
    </div>
  );
};

export default BarChart;
