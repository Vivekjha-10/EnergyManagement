import React from "react";
import { Chart } from "react-google-charts";

export const data = [
  ["Task", "Hours per Day"],
  ["Fix Charge", 20000],
  ["Vriable Charge", 400],
  
];

export const options = {
  title: "All Diesel Activities",
  is3D: true,
};

export function Pie() {
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
 export default Pie;