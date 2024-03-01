import React from "react";
import FunctionalDistribution from "./functionalDistribution";
import { useState } from "react";
import "../App.css";
import CastomChart from "./CastomChart";
import LineChart from "./LineChart";
import LineChartFunctionalDistribution from "./LineChartFunctionalDistribution";
import BarChart from "./BarChart";
export default function FrequencyTable({ data, isDiscrete }) {
  const rounding = 2;
  const variationSeries = [...data[1]];
  variationSeries.shift();
  variationSeries.sort((a, b) => a - b);
  const totalElements = variationSeries.length;
  const tableElement = [];
  variationSeries.forEach((item, index) => {
    const existingElement = tableElement.find((el) => el.value === item);
    if (!existingElement) {
      tableElement.push({
        value: item,
        count: 1,
        relativeFrequency: 1 / totalElements,
      });
    } else {
      existingElement.count++;
      existingElement.relativeFrequency = existingElement.count / totalElements;
    }
  });
  const sumCounts = tableElement
    .map((item) => item.count)
    .reduce((a, b) => a + b, 0);
  const sumFrequencies = tableElement
    .map((item) => item.relativeFrequency)
    .reduce((a, b) => a + b, 0);
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

  const max = Math.max(...tableElement.map((item) => item.count));
  const moda = [];

  tableElement.forEach((item) => {
    if (item.count === max) {
      moda.push(item.value);
    }
  });
  var mediana = 0;
  if (totalElements % 2 === 0 && totalElements > 0) {
    mediana =
      (variationSeries[totalElements / 2 + 1] +
        variationSeries[totalElements / 2]) /
      2;
  } else if (totalElements > 0) {
    mediana = variationSeries[Math.floor(totalElements / 2)];
  }
  const average =
    tableElement
      .map((item) => item.value * item.count)
      .reduce((a, b) => a + b, 0) / totalElements;

  const dev = tableElement
    .map((item) => Math.pow(item.value - average, 2) * item.count)
    .reduce((a, b) => a + b, 0);
  const variansa = dev / totalElements;
  const dispersia = dev / (totalElements - 1);
  const averageDeviation = Math.sqrt(dispersia);
  const standarta = Math.sqrt(variansa);
  const variation = standarta / average;
  const moment = (power, L) =>
    variationSeries
      .map((item) => Math.pow(item - L, power))
      .reduce((a, b) => a + b, 0) / totalElements;
  const asymmetry = moment(3, average) / Math.pow(moment(2, average), 3 / 2);
  const [selectedNumber, setSelectedNumber] = useState(25);
  const quantile = selectedNumber;
  var quantileValue = [];

  const handleNumberChange = (event) => {
    let value = parseFloat(event.target.value);
    if (value < 0) {
      value = 0;
    } else if (value > 100) {
      value = 100;
    }
    setSelectedNumber(value);
  };

  do {
    if (quantileValue.length === 0) {
      quantileValue.push({
        quantile: quantile,
        value: Number.isInteger(((quantile - 1) * totalElements) / 100)
          ? variationSeries[((quantile - 1) * totalElements) / 100]
          : null,
      });
    } else {
      quantileValue.push({
        quantile: quantileValue[quantileValue.length - 1].quantile + quantile,
        value: Number.isInteger(
          ((quantileValue[quantileValue.length - 1].quantile + quantile - 1) *
            totalElements) /
            100
        )
          ? variationSeries[
              ((quantileValue[quantileValue.length - 1].quantile +
                quantile -
                1) *
                totalElements) /
                100
            ]
          : null,
      });
    }
  } while (quantileValue[quantileValue.length - 1].quantile + quantile < 100);
  const interquartileRange =
    quantileValue[quantileValue.length - 1].value - quantileValue[0].value;
  return (
    <div className="App">
      <h3>Частатна табличка</h3>
      <table className="custom-table">
        <tbody>
          <tr>
            <td className="tablefreq">Значення</td>
            {tableElement.map((item) => (
              <td className="tableElement">{item.value}</td>
            ))}
            <td className="tablefreq">Сума</td>
          </tr>
          <tr>
            <td className="tablefreq">Частота</td>
            {tableElement.map((item) => (
              <td className="tableElement">{item.count}</td>
            ))}
            <td className="tablefreq">{sumCounts}</td>
          </tr>
          {isDiscrete ? (
            <tr>
              <td className="tablefreq">Відносна частота</td>
              {tableElement.map((item) => (
                <td className="tableElement">
                  {item.relativeFrequency.toFixed(rounding)}
                </td>
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
              <CastomChart
                x={tableElement.map((item) => item.value)}
                y={tableElement.map((item) => item.count)}
              />
            </div>
            <div style={{ width: "50%" }}>
              <LineChart
                x={tableElement.map((item) => item.value)}
                y={tableElement.map((item) => item.count)}
              />
            </div>
            <div style={{ width: "50%" }}>
              <LineChartFunctionalDistribution
                x={tableElement.map((item) => item.value)}
                y={tableElement.map((item) => item.relativeFrequency)}
              />
            </div>
          </div>
          <div style={{ flexDirection: "row" }}>
            <FunctionalDistribution
              data={data}
              keys={tableElement.map((item) => item.value)}
              frequencies={tableElement.map((item) => item.relativeFrequency)}
            />
          </div>
        </>
      ) : (
        <div style={{ width: "100%", alignContent: "flex-start" }}>
          <p>Розмах: {p}</p>
          <p>r: {r}</p>
          <p>Довжина кожного проміжку (d): {d.toFixed(rounding)}</p>
          <h3>Частотна табличка неперевних змінних</h3>
          <table className="custom-table">
            <tbody>
              <tr>
                <td className="tablefreq">ai, ai+1</td>
                {dataTable.map((interval) => (
                  <td className="tableElement">
                    [ {interval.start.toFixed(rounding)},{" "}
                    {interval.end.toFixed(rounding)})
                  </td>
                ))}
                <td className="tablefreq">Сума</td>
              </tr>
              <tr>
                <td className="tablefreq">zi</td>
                {dataTable.map((middle) => (
                  <td className="tableElement">
                    {middle.middle.toFixed(rounding)}
                  </td>
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
              x={dataTable.map((item) => item.middle.toFixed(rounding))}
              y={dataTable.map((item) => item.count)}
            />
          </div>
          <div>
            <p>Мода: {moda.map((item) => item.toFixed(rounding) + ",")}</p>
            <p>Медіана: {mediana.toFixed(rounding)}</p>
            <p>Середнє вибіркове: {average.toFixed(rounding)}</p>
            <p>Девіація: {dev}</p>
            <p>Варіанса: {variansa.toFixed(rounding)}</p>
            <p>Дисперсія: {dispersia.toFixed(rounding)}</p>
            <p>
              Середньоквадратичне відхилення:
              {averageDeviation.toFixed(rounding)}
            </p>
            <p>Стандарта: {standarta.toFixed(rounding)}</p>
            <p>Варіація: {variation.toFixed(rounding)}</p>
            <h2>Моменти</h2>
            <p>
              Початковий момент першого порядку:
              {moment(1, 0).toFixed(rounding)}
            </p>
            <p>
              Центральний момент першого порядку:
              {moment(1, average).toFixed(rounding)}
            </p>
            <p>
              Центральний момент другого порядку:
              {moment(2, average).toFixed(rounding)}
            </p>
            <p>
              Центральний момент третього порядку:
              {moment(3, average).toFixed(rounding)}
            </p>
            <p>Асиметрія: {asymmetry}</p>
            <h2>Квантилі</h2>
            <input
              type="number"
              value={selectedNumber}
              onChange={handleNumberChange}
              min={0}
              max={100}
            />
            {quantileValue.map((item) => (
              <p>
                Квантиль: {item.quantile} = {item.value}
              </p>
            ))}
            <p>
              Інтерквантильна широта :{interquartileRange.toFixed(rounding)}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
