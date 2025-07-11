import React from "react";
import { Chart } from "react-google-charts";

export const data = [
  ["Task", "Hours per Day"],
  ["Spare Consumtion", 10000],
  ["AMC Cost", 2000],
  ["Steam Cost", 500],
  
];

export const options = {
  title: "TG Electrical Generation Cost",
  is3D: true,
  colors: ["#00C853", "#0BA035", "#02B14B"]
};

export function Tgpie() {
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
 export default Tgpie;