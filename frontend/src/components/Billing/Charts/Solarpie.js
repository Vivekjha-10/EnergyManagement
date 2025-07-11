import React from "react";
import { Chart } from "react-google-charts";

export const data = [
  ["Task", "Hours per Day"],
  ["Spare Consumtion", 10000],
  ["AMC Cost", 2000],
];

export const options = {
  title: "Solar Electrical Generation Cost",
  is3D: true,
  colors: ["#1E88E5", "#1565C0"]
};

export function Solarpie() {
  return (
    <Chart
      chartType="PieChart"
      data={data}
      options={options}
      width={"100%"}
      height={"410px"}
      
    />
  );
}
 export default Solarpie;