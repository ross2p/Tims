import React from "react";
import "../App.css";
import CastomChart from "./CastomChart";
import { Chart as ChartJS, defaults } from "chart.js/auto";
import { Bar, Doughnut, Line } from "react-chartjs-2";
export default function FunctionalDistribution({ keys, frequencies }) {
  let sumFrequencies = 0;
  let leftValue = "-∞";
  return (
    <div>
      <h3>Функціональний Розподіл</h3>
      <div style={styles.container}>
        <p>F(x)=</p>
        <div style={styles.listFunctionalDistribution}>
          {frequencies.map((item, index) => {
            let str = "";
            let rightValue = keys[index];
            str += `${sumFrequencies.toFixed(
              2
            )} ,${leftValue} < x ≤ ${rightValue}`;
            sumFrequencies += item;
            leftValue = rightValue;
            return <p>{str}</p>;
          })}
          <p>
            {sumFrequencies.toFixed(2)}, {leftValue} &lt; x ≤ ∞
          </p>
        </div>
      </div>
    </div>
  );
}
const styles = {
  container: {
    flexDirection: "row",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  listFunctionalDistribution: {
    marginLeft: "25px",
  },
};
