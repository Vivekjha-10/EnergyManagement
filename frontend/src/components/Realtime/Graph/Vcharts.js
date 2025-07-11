import React, { Component } from 'react'
import Chart from 'react-google-charts'
const LineData = [
  ['x', 'V-R', 'V-Y','V-B'],
  [0, 0, 0,0],
  [1, 10, 5,6],
  [2, 23, 15,14],
  [3, 17, 9,8],
  [4, 18, 10,26],
  [5, 9, 5,20],
  [6, 11, 3,32],
  [7, 27, 19,7],
]
const LineChartOptions = {
  backgroundColor: 'transparent',
  hAxis: {
    title: 'Time',
    titleTextStyle: {
      fontSize: 18,
    },
  },
  vAxis: {
    title: 'Voltage',
    titleTextStyle: {
      fontSize: 18,
    },
  },
  curveType: 'function',
}
class Vcharts extends Component {
  render() {
    return (
      <>
        <h2 className='graph-title'> Voltage R-Y-B Graph</h2>
        <Chart
          width={'670px'}
          height={'310px'}
          chartType="LineChart"
          loader={<div>Loading Chart</div>}
          data={LineData}
          options={LineChartOptions}
          rootProps={{ 'data-testid': '3' }}
        />
      </>
    )
  }
}
export default Vcharts