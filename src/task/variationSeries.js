import React, { useState } from "react";
import "../App.css";

export default function VariationSeries({ data, setData }) {
  const variationSeries = [...data[1]];
  variationSeries.shift();
  return (
    <div>
      <h3>Варіаційний ряд</h3>
      <p className="variationSeries">
        {(() => {
          let str = "";
          variationSeries
            .sort((a, b) => a - b)
            .map((item) => (str += `${item}, `));
          return str;
        })()}
      </p>
    </div>
  );
}
