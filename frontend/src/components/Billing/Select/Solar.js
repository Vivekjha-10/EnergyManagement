import React, { useState, useEffect } from 'react'
import { FaRupeeSign, FaSolarPanel } from 'react-icons/fa'
import './css/Solar.css'
import { Chart } from "react-google-charts";
import ReactApexChart from "react-apexcharts";

function Solar() {
    const [spareconsumptioncost, setSpareConsumptionCost] = useState(null);
    const [amccost, setAmcCost] = useState(null);
    const [reccost, setRecCost] = useState(null);
    const [ acost, setAcost] = useState(0)
    const [totalcost, setTotalCost] = useState(null);
    const [solargeneration, setSolarGeneration] = useState(null);
    const [ solarrsperunit, setSolarRsPerUnit ] = useState(0)
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
                    const solarElectricityData = data.Response.ResponseData.solar;
                    const spareConsumption = parseFloat(solarElectricityData.spare_consumption_cost);
                    const amcCost = parseFloat(solarElectricityData.amc_cost);
                    const AmcCost = parseFloat(((solarElectricityData.amc_cost) / 12).toFixed(2))
                    const recCost = parseFloat(solarElectricityData.rec_cost);
                    setAcost(AmcCost);
                    setSpareConsumptionCost(spareConsumption);
                    setAmcCost(amcCost.toFixed(2));
                    setRecCost(recCost);

                    const calculatedTotalCost = spareConsumption + amcCost - recCost;
                    setTotalCost(calculatedTotalCost);
                    
                    // Assuming unit_generation_max and unit_generation_min are numbers
                    const calculatedSolarGeneration =
                        parseFloat(solarElectricityData.unit_generation_max) -
                        parseFloat(solarElectricityData.unit_generation_min);

                    setSolarGeneration(calculatedSolarGeneration);

                    const solarrsperunit = calculatedSolarGeneration !== 0 ? (calculatedTotalCost / calculatedSolarGeneration) : 0;
                    setSolarRsPerUnit(solarrsperunit)

                    const seriesData = data.Response.ResponseData.line_graph.solar.map(item => ({
                        x: new Date(item.year, item.month),
                        y: item.max_power_generation - item.min_power_generation ,
                    }));

    
                    setStateSol((prevStatew) => ({
                        ...prevStatew,
                        series: [{
                            name: 'Solar',
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
        ["Name", "Cost"],
        ["Spare Consumtion", spareconsumptioncost !== null ? spareconsumptioncost : 0],
        ["AMC Cost", parseFloat(acost)], // showing 100% percent value 
    ];

    const options = {
        title: "Solar Electrical Generation Cost",
        is3D: true,
        colors: ["#1E88E5", "#1565C0"]
    };

    const [statesol, setStateSol] = useState({
        series: [{
            name: 'Solar',
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
                categories: []
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

    })


    return (
        <>
            <div className="f-billing">
                <div className="sb-card1">
                    <div className="b-main-title">
                        <div className="b-title">
                            <div className='icn'><h3><FaSolarPanel /></h3></div>
                            <div className="mtitle"><h2>Spare Consumption Cost</h2></div>
                        </div>

                    </div>
                    <div className='b-wrap'>
                        <h3><FaRupeeSign /> {spareconsumptioncost !== null ? spareconsumptioncost : 0}</h3>
                    </div>
                </div>

                <div className="sb-card1">
                    <div className="b-main-title">
                        <div className="b-title">
                            <div className='icn'><h3><FaSolarPanel />
                            </h3></div>
                            <div className="mtitle"><h2>AMC Cost</h2></div>
                        </div>

                    </div>
                    <div className='b-wrap'>
                        <h3><FaRupeeSign /> {amccost !== null ? amccost : 0}</h3>
                    </div>
                </div>

                <div className="sb-card1">
                    <div className="b-main-title">
                        <div className="b-title">
                            <div className='icn'><h3><FaSolarPanel />
                            </h3></div>
                            <div className="mtitle"><h2>REC Cost</h2></div>
                        </div>

                    </div>
                    <div className='b-wrap'>
                        <h3><FaRupeeSign /> -{reccost !== null ? reccost : 0} </h3>
                    </div>
                </div>

            </div>

            <div className="f-billing">

                <div className="sb-card1">
                    <div className="b-main-title">
                        <div className="b-title">
                            <div className='icn'><h3><FaSolarPanel />
                            </h3></div>
                            <div className="mtitle"><h2>Total Cost</h2></div>
                        </div>

                    </div>
                    <div className='b-wrap'>
                        <h3><FaRupeeSign /> {totalcost !== null ? totalcost : 0}</h3>
                    </div>
                </div>

                <div className="sb-card1">
                    <div className="b-main-title">
                        <div className="b-title">
                            <div className='icn'><h3><FaSolarPanel />
                            </h3></div>
                            <div className="mtitle"><h2>Solar Generation</h2></div>
                        </div>

                    </div>
                    <div className='b-wrap'>
                        <h3>{solargeneration !== null ? solargeneration : 0} Unit</h3>
                    </div>
                </div>

                <div className="sb-card1">
                    <div className="b-main-title">
                        <div className="b-title">
                            <div className='icn'><h3><FaSolarPanel />
                            </h3></div>
                            <div className="mtitle"><h2>Solar RS/Unit</h2></div>
                        </div>

                    </div>
                    <div className='b-wrap'>
                        <h3><FaRupeeSign /> {solarrsperunit}</h3>
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
                        <ReactApexChart options={statesol.options} series={statesol.series} type="area" height={360} width={705} />
                    </div>
                </div>
            </div>
        </>
    )
}

export default Solar
