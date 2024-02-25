import React, { useState } from "react";
import InputFile from "./task/inputFile";
import Condition from "./task/condition";
import VariationSeries from "./task/variationSeries";
import FrequencyTable from "./task/frequencyTable";
import FunctionalDistribution from "./task/functionalDistribution";
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
      {isDiscrete ? (
        <>
          <InputFile setEditableData={setData} />
          {data.length > 0 && (
            <div>
              <Condition editableData={data} setEditableData={setData} />
              <VariationSeries data={data} setData={setData} />
              <FrequencyTable data={data} />
            </div>
          )}
        </>
      ) : (
        <></>
      )}
    </div>
  );
}
