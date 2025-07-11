import React, { Component } from 'react'
import Chart from 'react-google-charts'
const LineData = [
  ['x', 'V', 'C',],
  [0, 0, 0,],
  [1, 10, 5],
  [2, 23, 15],
  [3, 17, 9],
  [4, 18, 10],
  [5, 9, 5],
  [6, 11, 3],
  [7, 27, 19],
]
const LineChartOptions = {
  hAxis: {
    title: 'Time',
  },
  vAxis: {
    title: 'Popularity',
  },
  series: {
    1: { curveType: 'function' },
  },
}
class Charts extends Component {
  render() {
    return (
      <div className="container">
      
        <Chart
          width={'480px'}
          height={'310px'}
          chartType="LineChart"
          loader={<div>Loading Chart</div>}
          data={LineData}
          options={LineChartOptions}
          rootProps={{ 'data-testid': '2' }}
        />
      </div>
    )
  }
}
export default Charts