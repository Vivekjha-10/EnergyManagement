import React from "react";
import { Chart } from "react-google-charts";

export const data = [
  ["Parameters", "Hours per Day"],
  ["Fix Charge", 20000],
  ["Vriable Charge", 400],
  
];

export const options = {
  title: "State Electricity Board Electrical Cost",
  is3D: true,
  colors: ["#672BDF", "#4527A0"]
};

export function Msedclpie() {
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
 export default Msedclpie;