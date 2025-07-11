import React from "react";
import { Chart } from "react-google-charts";

export const data = [
  ["Name", "KWH"],
  ["MSEDCL", 300],
  ["SOLAR", 270],
  ["Total DG", 260],
  ["Total TG", 190],
  ["GT", 107],
  ["Others", 104]
];

export const options = {
//   title: "Today generation (KWH)",
//   titleTextStyle: {
//     fontSize: '25',
// },
chartArea:{
  left:"15%",
  top:"20%",
  right:"1",
},
  is3D: true,
  colors: ["#7E57C2", "#409AE9", "#F55F54","#00C853", "#4DC7FF", "#3DEF81"]
};


export function Pie() {
  return (
    <Chart
      chartType="PieChart"
      data={data}
      options={options}
      width={"490px"}
      height={"400px"}
    />
  );
}

export default Pie;