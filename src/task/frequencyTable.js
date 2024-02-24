import React from "react";
import "../App.css";

export default function FrequencyTable({ data }) {
  const countMap = new Map();
  const variationSeries = [...data[1]];
  variationSeries.shift();
  const totalElements = variationSeries.length;

  variationSeries.forEach((item) => {
    if (countMap.has(item)) {
      countMap.set(item, countMap.get(item) + 1);
    } else {
      countMap.set(item, 1);
    }
  });

  countMap.forEach((value, key) => {
    const relativeFrequency = value / totalElements;
    countMap.set(key, { count: value, relativeFrequency: relativeFrequency });
  });

  const keys = Array.from(countMap.keys());
  const counts = keys.map((key) => countMap.get(key).count);
  const frequencies = keys.map((key) => countMap.get(key).relativeFrequency);

  return (
    <div className="App">
      <h2>Частоти та відносні ймовірності</h2>
      <table>
        <tbody>
          <tr>
            <td>Значення</td>
            {keys.map((key, index) => (
              <td>{key}</td>
            ))}
          </tr>
          <tr>
            <td>Частота</td>
            {counts.map((key, index) => (
              <td>{key}</td>
            ))}
          </tr>
          <tr>
            <td>Відносна частота</td>
            {frequencies.map((key, index) => (
              <td>{key}</td>
            ))}
          </tr>
        </tbody>
      </table>
    </div>
  );
}
