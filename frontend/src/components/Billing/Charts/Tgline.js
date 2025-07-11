import React, { useState } from 'react'
import ReactApexChart from "react-apexcharts";


function Tgline() {
    const [state] = useState({
        series: [{
            name: 'TG',
            data: [30 , 40, 50, 60, 70, 80, 30 , 40, 50, 60, 70, 80,],
        }],
        options: {
            chart: {
                height: 350,
                type: 'area'
            },
            dataLabels: {
                enabled: false
            },
            stroke: {
                curve: 'smooth'
            },
            xaxis: {
               type:'datetime',
               categories: ['01/01/2023 GMT', '02/02/2023 GMT','03/03/2023 GMT','04/04/2023 GMT','05/05/2023 GMT','06/06/2023 GMT','07/07/2023 GMT','08/08/2023 GMT','09/09/2023 GMT', '10/10/2023 GMT', '11/11/2023 GMT','12/12/2023 GMT']
            },
            yaxis:{
                labels: {
                    show: true,
                    align: 'right',
                    minWidth: 0,
                    maxWidth: 160,
                    style: {
                        fontSize: '12px',
                        fontWeight: 600,
                        
                    },
                },
            },
            tooltip: {
                x: {
                    format: 'dd/MM/yy',
                },
            },
        },

    })
    return (
        <>
            <div id="chart">
                <ReactApexChart options={state.options} series={state.series} type="area" height={360} width={705} />
            </div>

        </>
    )
}

export default Tgline




   

