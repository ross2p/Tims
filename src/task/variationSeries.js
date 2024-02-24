import React, { useState } from "react";
import "../App.css";

export default function VariationSeries({ data, setData }) {
  const variationSeries = [...data[1]];
  variationSeries.shift();
  return (
    <div>
      {(() => {
        let str = "Варіаційний ряд: ";
        variationSeries
          .sort((a, b) => a - b) // Сортуємо масив
          .map((item) => (str += `${item}, `)); // Відображаємо елементи
        return str;
      })()}
    </div>
  );
}
