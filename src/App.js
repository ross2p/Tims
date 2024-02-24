import React, { useState } from "react";
import InputFile from "./task/inputFile";
import Condition from "./task/condition";
import VariationSeries from "./task/variationSeries";
import FrequencyTable from "./task/frequencyTable";
import logo from "./logo.svg";
import "./App.css";

export default function App() {
  const [data, setData] = useState([]);

  return (
    <div className="App">
      <InputFile setEditableData={setData} />
      {data.length > 0 && (
        <div>
          <Condition editableData={data} setEditableData={setData} />
          <VariationSeries data={data} setData={setData} />
          <FrequencyTable data={data} />
        </div>
      )}
    </div>
  );
}
