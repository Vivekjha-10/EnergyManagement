// import React from 'react';
// import Chart from "react-google-charts";

// function Column() {
//   return (
//     <>
//       <Chart
//           width={"850px"}
//           height={"500px"}
//           chartType="ColumnChart"
//           loader={<div>Loading Chart</div>}
//           data={[
//             ["Duration", "MSEDCL", "SOLAR", "GT SET-1"],
//             ["Week-1", 20, 38, 30],
//             ["Week-2", 10, 10, 20],
//             ["Week-3", 30, 32, 30],
//             ["Week-4", 20, 34, 12],
//             ["Week-5", 20, 34, 12],
//             ["Week-6", 20, 34, 12],
//             ["Week-7", 20, 34, 12]
//           ]}
//           options={{
//             // title: "Generation Chart",
//           //   titleTextStyle: {
//           //     fontSize: '38',
//           //  },
//             chartArea: { width: "70%" },
//             isStacked: true,
//             vAxis: {
//               title: "KWH",
//               fontWeight: 800,
//               // gridlines: { count: 3 } ,
//               gridlines: { color: "none" },
//               textPosition: "none"
//             },
//             bars: "vertical",
//             colors: ["#A1D2FA", "#409AE9", "#7E57C2"]
//           }}
//           // For tests
//           rootProps={{ "data-testid": "3" }}
//         />
//     </>
//   )
// }

// export default Column

import React, { useState } from 'react'
import ReactApexChart from "react-apexcharts";

function Column() {
  const [state] = useState({  
      series: [{
        name: 'MSEDCL',
        data: [44, 55, 41, 67, 22, 43]
      }, {
        name: 'SOLAR',
        data: [13, 23, 20, 8, 13, 27]
      }, {
        name: 'Total DG',
        data: [11, 17, 15, 15, 21, 14]
      },{
        name: 'Total TG',
        data: [22, 20, 21, 26, 13, 19]
      }, {
        name: 'GT',
        data: [13, 23, 20, 8, 13, 27]
      },{
        name: 'Others',
        data: [13, 23, 20, 8, 13, 24]
      }
    ],
      options: {
        chart: {
          type: 'bar',
          height: 500,
          stacked: true,
          toolbar: {
            show: true
          },
          zoom: {
            enabled: true
          }
        },
        responsive: [{
          breakpoint: 480,
          options: {
            legend: {
              position: 'bottom',
              offsetX: -10,
              offsetY: 0
            }
          }
        }],
        plotOptions: {
          bar: {
            horizontal: false,
            borderRadius: 10,
            dataLabels: {
              total: {
                enabled: true,
                style: {
                  fontSize: '15px',
                  fontWeight: 900

                }
              }
            }
          },
        },
        xaxis: {
          type: 'datetime',
          categories: ['01/01/2023 GMT', '01/02/2023 GMT', '01/03/2023 GMT', '01/04/2023 GMT',
            '01/05/2023 GMT', '01/06/2023 GMT'
          ],
        },
        yaxis:{ 
          title: {
            text: 'KWH',
            style:{
               color: "#3C3CF0",   
              fontSize: '18px'
            } 
           },
           labels:{
            style:{
              fontWeight: 700,
            },
           }
        },
        colors: ["#7E57C2", "#409AE9", "#F55F54","#00C853", "#4DC7FF", "#6FFFA6"],  
        legend: {
          position: 'right',
          offsetY: 40
        },
        fill: {
          opacity: 1
        }
      },
  });

  
  return (
    <>
      <div id="chart">
        <ReactApexChart options={state.options} series={state.series} type="bar" height={400} width={950} />
      </div>
    </>
  )
}

export default Column
