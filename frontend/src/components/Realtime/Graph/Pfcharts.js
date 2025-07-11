import React, { Component } from 'react'
import Chart from 'react-google-charts'
const LineData = [
  ['x', 'V P-R', 'V P-Y','V P-B'],
  [0, 0, 0,0],
  [1, 0.8, 1, 0.6],
  [2, 0.23, 0.9, 0.7],
  [3, 1, 0.9, 0.8],
  [4, 0.18, 0.1, 0.6],
  [5, 0.9, 0.5, 1],
  [6, 0.88, 0.87, 0.9],
  [7, 1, 0.89, 0.7],
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
    title: 'PF',
    titleTextStyle: {
      fontSize: 18,
    },
  },
  curveType: 'function',

}
class Pfcharts extends Component {
  render() {
    return (
      <>
        <h2 className='graph-title'> Power factor R-Y-B Graph</h2>
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
export default Pfcharts