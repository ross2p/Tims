import React from "react";
import FunctionalDistribution from "./functionalDistribution";
import "../App.css";
import CastomChart from "./CastomChart";
import LineChart from "./LineChart";
import LineChartFunctionalDistribution from "./LineChartFunctionalDistribution";
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

  var keys = Array.from(countMap.keys());
  var counts = keys.map((key) => countMap.get(key).count);
  var frequencies = keys.map((key) => countMap.get(key).relativeFrequency);
  const sumCounts = counts.reduce((total, current) => total + current, 0);
  const sumFrequencies = frequencies
    .reduce((total, current) => total + current, 0)
    .toFixed(3);
  var combinedArray = keys.map((key, index) => ({
    key: key,
    count: counts[index],
    frequency: frequencies[index],
  }));

  combinedArray.sort((a, b) => a.key - b.key);

  keys = combinedArray.map((item) => item.key);
  counts = combinedArray.map((item) => item.count);
  frequencies = combinedArray.map((item) => item.frequency);
  return (
    <div className="App">
      <h3>Частатна табличка</h3>
      <table className="custom-table">
        <tbody>
          <tr>
            <td className="tablefreq">Значення</td>
            {keys.map((key, index) => (
              <td className="tableElement">{key}</td>
            ))}
            <td className="tablefreq">Сума</td>
          </tr>
          <tr>
            <td className="tablefreq">Частота</td>
            {counts.map((key, index) => (
              <td className="tableElement">{key}</td>
            ))}
            <td className="tablefreq">{sumCounts}</td>
          </tr>
          <tr>
            <td className="tablefreq">Відносна частота</td>
            {frequencies.map((key, index) => (
              <td className="tableElement">{key}</td>
            ))}

            <td className="tablefreq">{sumFrequencies}</td>
          </tr>
        </tbody>
      </table>
      <div>
        <div style={{ width: "50%" }}>
          <CastomChart x={keys} y={counts} />
        </div>
        <div style={{ width: "50%" }}>
          <LineChart x={keys} y={counts} />
        </div>
        <div style={{ width: "50%" }}>
          <LineChartFunctionalDistribution x={keys} y={frequencies} />
        </div>
      </div>
      <div style={{ flexDirection: "row" }}>
        <FunctionalDistribution
          data={data}
          keys={keys}
          frequencies={frequencies}
        />
      </div>
    </div>
  );
}
