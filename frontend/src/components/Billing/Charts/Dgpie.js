import React from "react";
import { Chart } from "react-google-charts";

export const data = [
  ["Task", "Hours per Day"],
  ["B Check Cost", 20000],
  ["AMC Cost", 7000],
  ["Diesel Cost", 12500],
  
];

export const options = {
  title: "DG Electrical Generation Cost",
  is3D: true,
  colors: ["#F55F54", "#D83A2F", "#EE463B"]
};

export function Dgpie() {
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
 export default Dgpie;