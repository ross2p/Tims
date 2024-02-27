import React from "react";
import FunctionalDistribution from "./functionalDistribution";
import "../App.css";
import CastomChart from "./CastomChart";
import LineChart from "./LineChart";
import LineChartFunctionalDistribution from "./LineChartFunctionalDistribution";
import BarChart from "./BarChart";
export default function FrequencyTable({ data, isDiscrete }) {
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

  //неперервні змінні
  //розмах
  const p = Math.max(...variationSeries) - Math.min(...variationSeries);
  const r = Math.ceil(Math.log2(variationSeries.length) - 1);
  const d = p / (r + 1);

  var start = Math.min(...variationSeries);
  var dataTable = [];
  while (start < Math.max(...variationSeries)) {
    dataTable.push({
      start: start,
      end: start + d,
      middle: (start + start + d) / 2,
      count: 0,
    });
    start += d;
  }
  variationSeries.forEach((item) => {
    for (let i = 0; i < dataTable.length; i++) {
      if (item >= dataTable[i].start && item < dataTable[i].end) {
        dataTable[i].count++;
        break;
      }
    }
  });
  return (
    <div className="App">
      <h3>Частатна табличка</h3>
      <table className="custom-table">
        <tbody>
          <tr>
            <td className="tablefreq">Значення</td>
            {keys.map((key) => (
              <td className="tableElement">{key}</td>
            ))}
            <td className="tablefreq">Сума</td>
          </tr>
          <tr>
            <td className="tablefreq">Частота</td>
            {counts.map((key) => (
              <td className="tableElement">{key}</td>
            ))}
            <td className="tablefreq">{sumCounts}</td>
          </tr>
          {isDiscrete ? (
            <tr>
              <td className="tablefreq">Відносна частота</td>
              {frequencies.map((key) => (
                <td className="tableElement">{key}</td>
              ))}
              <td className="tablefreq">{sumFrequencies}</td>
            </tr>
          ) : (
            <></>
          )}
        </tbody>
      </table>
      {isDiscrete ? (
        <>
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
        </>
      ) : (
        <div style={{ width: "100%", alignContent: "flex-start" }}>
          <p>Розмах: {p}</p>
          <p>r: {r}</p>
          <p>d: {d}</p>
          <h3>Частотна табличка неперевних змінних</h3>
          <table className="custom-table">
            <tbody>
              <tr>
                <td className="tablefreq">ai, ai+1</td>
                {dataTable.map((interval) => (
                  <td className="tableElement">
                    [ {interval.start}, {interval.end})
                  </td>
                ))}
                <td className="tablefreq">Сума</td>
              </tr>
              <tr>
                <td className="tablefreq">zi</td>
                {dataTable.map((middle) => (
                  <td className="tableElement">{middle.middle.toFixed(2)}</td>
                ))}
                <td className="tablefreq">{}</td>
              </tr>
              <tr>
                <td className="tablefreq">mi</td>
                {dataTable.map((count) => (
                  <td className="tableElement">{count.count}</td>
                ))}
                <td className="tablefreq">{sumCounts}</td>
              </tr>
            </tbody>
          </table>
          <div style={{ width: "50%" }}>
            <BarChart
              x={dataTable.map((item) => item.middle.toFixed(2))}
              y={dataTable.map((item) => item.count)}
            />
          </div>
        </div>
      )}
    </div>
  );
}
