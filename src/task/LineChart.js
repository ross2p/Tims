import React from "react";
import { Line } from "react-chartjs-2";

const Chart = ({ x, y }) => {
  const data = {
    labels: x,
    datasets: x.map((item, index) => {
      return {
        label: item,
        fill: false,
        borderColor: "rgba(75,192,192,1)",
        borderWidth: 2,
        pointRadius: 0,
        data: [
          { x: item, y: 0 },
          { x: item, y: y[index] },
        ],
      };
    }),
  };

  const options = {
    scales: {
      xAxes: [
        {
          type: "linear",
          position: "bottom",
        },
      ],
      yAxes: [
        {
          type: "linear",
          position: "left",
        },
      ],
    },
  };

  return (
    <div>
      <h2>Діаграма частот</h2>
      <Line data={data} options={options} />
    </div>
  );
};

export default Chart;
