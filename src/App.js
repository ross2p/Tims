import React, { useState } from "react";
import InputFile from "./task/inputFile";
import Condition from "./task/condition";
import VariationSeries from "./task/variationSeries";
import FrequencyTable from "./task/frequencyTable";
import FunctionalDistribution from "./task/functionalDistribution";
import ConditionSecond from "./task/ConditionSecond";
import "./App.css";

export default function App() {
  const [data, setData] = useState([]);
  const [isDiscrete, setIsDiscrete] = useState(true);
  const toggleValue = () => {
    setIsDiscrete((prevState) => !prevState);
  };
  return (
    <div className="App">
      <button onClick={toggleValue}>Змінити змінну</button>
      <InputFile setEditableData={setData} />

      {isDiscrete ? (
        <>
          {data.length > 0 && (
            <div>
              <Condition editableData={data} setEditableData={setData} />
              <VariationSeries data={data} setData={setData} />
              <FrequencyTable data={data} isDiscrete={true} />
            </div>
          )}
        </>
      ) : (
        <>
          <ConditionSecond editableData={data} setEditableData={setData} />
          <VariationSeries data={data} setData={setData} />
          <FrequencyTable data={data} isDiscrete={false} />
        </>
      )}
    </div>
  );
}
