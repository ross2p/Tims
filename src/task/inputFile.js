import React, { useState } from "react";
import "../App.css";

export default function InputFile({ setEditableData }) {
  const [data, setData] = useState([]);
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    // if (file.name !== "data.csv") {
    //   alert("Please upload a file named data.csv");
    //   return;
    // }
    const reader = new FileReader();

    reader.onload = (event) => {
      const csv = event.target.result;
      const lines = csv.split("\n");
      const parsedData = lines.map((line) => line.split(","));
      // Remove the last row if it's empty
      if (parsedData[parsedData.length - 1].length === 1) {
        parsedData.pop();
      }
      // Transpose the data
      const transposedData = parsedData[0].map((col, i) =>
        parsedData.map((row) => row[i])
      );

      //Convert elements to numbers except for the first column
      const convertedData = transposedData.map((row, rowIndex) =>
        row.map((col, colIndex) => (colIndex === 0 ? col : parseFloat(col)))
      );

      setData(convertedData);
      setEditableData(convertedData.map((row) => [...row]));
    };

    reader.readAsText(file);
  };
  return (
    <div className="App">
      <input type="file" accept=".csv" onChange={handleFileUpload} />
    </div>
  );
}
