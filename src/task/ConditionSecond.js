import React, { useState } from "react";
import "../App.css";

export default function ConditionSecond({ editableData, setEditableData }) {
  const handleCellEdit = (value, cellIndex) => {
    const newData = editableData.map((row, rIndex) => {
      if (rIndex === 1) {
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
            <tr>
              {editableData[1].map((item, index) => (
                <React.Fragment key={index}>
                  {index === 0 ? (
                    <th>
                      <input
                        className="custom-input"
                        type="text"
                        value={item}
                        onChange={(e) => {
                          handleCellEdit(e.target.value, index);
                        }}
                      />
                    </th>
                  ) : (
                    <td>
                      <input
                        className="custom-input"
                        type="number"
                        value={item}
                        onChange={(e) => {
                          handleCellEdit(parseFloat(e.target.value), index);
                        }}
                      />
                    </td>
                  )}
                </React.Fragment>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
