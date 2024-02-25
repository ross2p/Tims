import React from "react";
import { Line } from "react-chartjs-2";

const Chart = ({ x, y }) => {
  var sum = 0;
  var leftValue = x[0] - 3;
  const datasets = x
    .map((item, index) => {
      const dataElement = {
        label: item,
        fill: false,
        borderColor: "rgba(75,192,192,1)",
        borderWidth: 2,
        pointRadius: 0,
        data: [
          { y: sum, x: leftValue },
          { y: sum, x: item },
        ],
      };
      sum += y[index];
      leftValue = item;
      return dataElement;
    })
    .concat([
      {
        label: "111",
        fill: false,
        borderColor: "rgba(75,192,192,1)",
        borderWidth: 2,
        pointRadius: 0,
        data: [
          { y: sum, x: x[x.length - 1] },
          { y: sum, x: x[x.length - 1] + 1 },
        ],
      },
    ]);
  const data = {
    labels: [x[0] - 1, ...x, x[x.length - 1] + 1],
    datasets: datasets,
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
      <h2>Функціональний Розподіл</h2>
      <Line data={data} options={options} />
    </div>
  );
};

export default Chart;
