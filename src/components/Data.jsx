import React from "react";

function Data({ sym, name, price, change, changePer }) {
  return (
    <tr>
      <td>{sym}</td>
      <td>{name}</td>
      <td>{price}</td>
      <td className={change < 0 ? "low" : "high"}>{change}</td>
      <td className={changePer < 0 ? "low" : "high"}>{changePer}</td>
    </tr>
  );
}

export default Data;
