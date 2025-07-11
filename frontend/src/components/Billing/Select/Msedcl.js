import React, { useState, useEffect } from 'react'
import './css/Msedcl.css'
import { FaRupeeSign } from 'react-icons/fa'
import { MdElectricMeter } from 'react-icons/md'
import { Chart } from "react-google-charts";
import ReactApexChart from "react-apexcharts";


function Msedcl() {

    const [fixRate, setFixRate] = useState(null);
    const [variableRate, setVariableRate] = useState(null);
    const [totalRate, setTotalRate] = useState(null);
    const [unitGeneration, setUnitGeneration] = useState(null);
    const [totalCost, setTotalCost] = useState(null);

    useEffect(() => {
        let token = localStorage.getItem(`x-auth-token`);
        token = token.replace(/"/g, "")
        if (!token) {
            console.error('Authentication token missing');
            return;
        }

        fetch('http://localhost:4001/Management/api/v1/sidebar/billing', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-auth-token': `${token}`,
            },
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Bad request');
                }
                return response.json();
            })
            .then((data) => {
                if (data.Response.Status.StatusCode === '0') {
                    const electricityData = data.Response.ResponseData.state_board_electricity;

                    setFixRate(electricityData.fix_rate);
                    setVariableRate(electricityData.variable_rate);
                    const max = parseFloat(electricityData.unit_generation_max);
                    const min = parseFloat(electricityData.unit_generation_min);
                    const generation = max - min;
                    setUnitGeneration(generation);

                    // Perform calculations using the updated state values
                    const rate = parseFloat(electricityData.fix_rate) + parseFloat(electricityData.variable_rate);
                    setTotalRate(rate);

                    const cost = generation * rate;
                    setTotalCost(cost);

                    const seriesData = data.Response.ResponseData.line_graph.state_board_electricity.map(item => ({
                        x: new Date(item.year, item.month),
                        y: item.max_power_generation - item.min_power_generation ,
                    }));

    
                    setStatew((prevStatew) => ({
                        ...prevStatew,
                        series: [{
                            name: 'State Electricity',
                            data: seriesData,
                        }],
                        options: {
                            ...prevStatew.options,
                            xaxis: {
                                ...prevStatew.options.xaxis,
                                categories: seriesData.map(item => item.x.toISOString().slice(0, 10)),
                            },
                        },
                    }));
                }

            })
            .catch((error) => {
                console.error('Request failed:', error);
            });

    }, []);

    const data = [
        ["Parameters", "Hours per Day"],
        ["Fix Charge", fixRate !== null ? parseFloat(fixRate) : 0],
        ["Vriable Charge", variableRate !== null ? parseFloat(variableRate) : 0],

    ];

    const options = {
        title: "State Electricity Board Electrical Cost",
        is3D: true,
        colors: ["#672BDF", "#4527A0"]
    };



    const [statew, setStatew] = useState({
        series: [{
            name: 'State Electricity',
            data: [],
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
                type: 'datetime',
                categories: [],
            },
            yaxis: {
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
                    format: 'MM/yy',
                },
            },
        },
    });

    return (
        <>

            <div className="f-billing">
                <div className="b-card1">
                    <div className="b-main-title">
                        <div className="b-title">
                            <div className='icn'><h3><MdElectricMeter /></h3></div>
                            <div className="mtitle"><h2>Fix Rate / Unit </h2></div>
                        </div>

                    </div>
                    <div className='b-wrap'>
                        <h3><FaRupeeSign />{fixRate !== null ? fixRate : 0}</h3>
                    </div>
                </div>

                <div className="b-card1">
                    <div className="b-main-title">
                        <div className="b-title">
                            <div className='icn'><h3><MdElectricMeter /></h3></div>
                            <div className="mtitle"><h2>Variable Rate / Unit</h2></div>
                        </div>

                    </div>
                    <div className='b-wrap'>
                        <h3><FaRupeeSign /> {variableRate !== null ? variableRate : 0}</h3>
                    </div>
                </div>

                <div className="b-card1">
                    <div className="b-main-title">
                        <div className="b-title">
                            <div className='icn'><h3><MdElectricMeter /></h3></div>
                            <div className="mtitle"><h2>Total Rate / Unit</h2></div>
                        </div>

                    </div>
                    <div className='b-wrap'>
                        <h3><FaRupeeSign /> {totalRate !== null ? totalRate : 0} </h3>
                    </div>
                </div>
            </div>

            <div className="f-billing">

                <div className="b-card1">
                    <div className="b-main-title">
                        <div className="b-title">
                            <div className='icn'><h3><MdElectricMeter /></h3></div>
                            <div className="mtitle"><h2>Unit Generation</h2></div>
                        </div>

                    </div>
                    <div className='b-wrap'>
                        <h3>{unitGeneration !== null ? unitGeneration : 0} Units </h3>
                    </div>
                </div>

                <div className="b-card1">
                    <div className="b-main-title">
                        <div className="b-title">
                            <div className='icn'><h3><MdElectricMeter /></h3></div>
                            <div className="mtitle"><h2>Total Rate / Unit</h2></div>
                        </div>

                    </div>
                    <div className='b-wrap'>
                        <h3><FaRupeeSign /> {totalRate !== null ? totalRate : 0} </h3>
                    </div>
                </div>

                <div className="b-card1">
                    <div className="b-main-title">
                        <div className="b-title">
                            <div className='icn'><h3><MdElectricMeter /></h3></div>
                            <div className="mtitle"><h2>Total Cost</h2></div>
                        </div>

                    </div>
                    <div className='b-wrap'>
                        <h3><FaRupeeSign /> {totalCost !== null ? totalCost : 0}</h3>
                    </div>
                </div>
            </div>

            <div className="containgraph">
                <div className="pie-chart">
                    <Chart
                        chartType="PieChart"
                        data={data}
                        options={options}
                        width={"100%"}
                        height={"410px"}

                    />
                </div>
                <div className="linegraph-cover">
                    <div id="chart">
                        <ReactApexChart options={statew.options} series={statew.series} type="area" height={360} width={705} />
                    </div>
                </div>
            </div>

        </>
    )
}

export default Msedcl
