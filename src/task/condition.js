import React, { useState } from "react";
import "../App.css";

export default function Condition({ editableData, setEditableData }) {
  const [data, setData] = useState([]);

  const handleCellEdit = (value, rowIndex, cellIndex) => {
    const newData = editableData.map((row, rIndex) => {
      if (rIndex === rowIndex) {
        return row.map((cell, cIndex) => {
          if (cIndex === cellIndex) {
            return value;
          } else {
            return cell;
          }
        });
      } else {
        return row;
      }
    });
    setEditableData(newData);
    console.log(editableData);
  };

  return (
    <div className="App">
      <div style={{ overflow: "auto", maxHeight: "300px" }}>
        <table className="custom-table">
          <tbody>
            {editableData.map((row, rowIndex) => (
              <tr key={rowIndex}>
                {row.map((cell, cellIndex) => (
                  <React.Fragment key={cellIndex}>
                    {cellIndex === 0 ? (
                      <th>
                        <input
                          className="custom-input"
                          type="text"
                          value={cell}
                          onChange={(e) => {
                            handleCellEdit(e.target.value, rowIndex, cellIndex);
                          }}
                        />
                      </th>
                    ) : (
                      <td>
                        <input
                          className="custom-input"
                          type="number"
                          value={cell}
                          onChange={(e) => {
                            handleCellEdit(
                              parseFloat(e.target.value),
                              rowIndex,
                              cellIndex
                            );
                          }}
                        />
                      </td>
                    )}
                  </React.Fragment>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
