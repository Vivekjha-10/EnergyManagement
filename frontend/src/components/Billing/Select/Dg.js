import React, { useState, useEffect } from 'react'
import './css/Dg.css';
import { FaRupeeSign } from 'react-icons/fa'
import { BsFillFuelPumpDieselFill } from 'react-icons/bs'
import { Chart } from "react-google-charts";
import ReactApexChart from "react-apexcharts";

function Dg() {
    const [dieselConsumption, setDieselConsumption] = useState(null);
    const [dieselRate, setDieselRate] = useState(null);
    const [bCheckCost, setBCheckCost] = useState(null);
    const [amcCost, setAmcCost] = useState(null);
    const [acost, setAC] = useState(0);
    const [bccost, setBCC] = useState(0);
    const [dieselCost, setDieselCost] = useState(null);
    const [totalCost, setTotalCost] = useState(null);
    const [dgGeneration, setDgGeneration] = useState(null);
    const [dgRsPerUnit, setDgRsPerUnit] = useState(null);
    const [dgLiterPerUnit, setDgLiterPerUnit] = useState(null);

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
                    const dgData = data.Response.ResponseData.diesel_generator;
                    setDieselRate(parseFloat(dgData.diesel_rate));
                    setBCheckCost(parseFloat(dgData.b_check_cost));
                    setAmcCost(parseFloat(dgData.amc_cost));
                    setBCC(parseFloat(dgData.b_check_cost / 6).toFixed(2))
                    setAC(parseFloat(dgData.amc_cost / 12).toFixed(2))
                    setDgGeneration(
                        (parseFloat(dgData.unit_generation_1_max) - parseFloat(dgData.unit_generation_1_min)) +
                        (parseFloat(dgData.unit_generation_2_max) - parseFloat(dgData.unit_generation_2_min)) +
                        (parseFloat(dgData.unit_generation_3_max) - parseFloat(dgData.unit_generation_3_min)) +
                        (parseFloat(dgData.unit_generation_4_max) - parseFloat(dgData.unit_generation_4_min))

                    );



                    const dieselConsumption = (parseFloat(dgData.diesel_consumption_1) + parseFloat(dgData.diesel_consumption_2) + parseFloat(dgData.diesel_consumption_3) + parseFloat(dgData.diesel_consumption_4));
                    setDieselConsumption(dieselConsumption);

                    const totalDieselCost = dieselConsumption * (parseFloat(dgData.diesel_rate));
                    setDieselCost(totalDieselCost);

                    const dgtotalcost = (((parseFloat(dgData.b_check_cost) / 6) + (parseFloat(dgData.amc_cost) / 12) + totalDieselCost).toFixed(2));
                    setTotalCost(dgtotalcost);

                    const dgrsperunit = dgGeneration !== 0 ? (dgtotalcost / dgGeneration) : 0;
                    setDgRsPerUnit(dgrsperunit)

                    const dgliterperunit = dgGeneration !== 0 ? (dieselConsumption / dgGeneration) : 0;
                    setDgLiterPerUnit(dgliterperunit);
                  

                    const allDgData = [
                        ...data.Response.ResponseData.line_graph.diesel_generator_set_1,
                        ...data.Response.ResponseData.line_graph.diesel_generator_set_2,
                        ...data.Response.ResponseData.line_graph.diesel_generator_set_3,
                        ...data.Response.ResponseData.line_graph.diesel_generator_set_4,
                    ];

                    const seriesData = allDgData.map((item) => ({
                        x: new Date(item.year, item.month),
                        y: item.max_power_generation - item.min_power_generation,
                      }));
                  
                    setStatewd((prevStatew) => ({
                        ...prevStatew,
                        series: [
                            {
                                name: 'DG',
                                data: seriesData,
                            },
                        ],
                        options: {
                            ...prevStatew.options,
                            xaxis: {
                                ...prevStatew.options.xaxis,
                                categories: seriesData.map((item) =>
                                    item.x.toISOString().slice(0, 10)
                                ),
                            },
                        },
                    }));

                }
            })
            .catch((error) => {
                console.error('Request failed:', error);
            });

    }, [totalCost, dgGeneration]);
    const data = [
        ["Task", "Hours per Day"],
        ['B Check Cost by Month', parseFloat(bccost)],
        ['AMC Cost by Month', parseFloat(acost)],
    ];

    const options = {
        title: "DG Electrical Generation Cost",
        is3D: true,
        colors: ["#F55F54", "#D83A2F", "#EE463B"]
    };


    const [statewd, setStatewd] = useState({
        series: [{
            name: 'DG',
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

    })
    return (
        <>

            <div className="f-billing">

                <div className="b-card3">
                    <div className="b-main-title">
                        <div className="b-title">
                            <div className='icn'><h3><BsFillFuelPumpDieselFill /></h3></div>
                            <div className="mtitle"><h2>Diesel Consumption</h2></div>
                        </div>

                    </div>
                    <div className='b-wrap'>
                        <h3>{dieselConsumption !== null ? dieselConsumption : 0} L</h3>
                    </div>
                </div>

                <div className="b-card3">
                    <div className="b-main-title">
                        <div className="b-title">
                            <div className='icn'><h3><BsFillFuelPumpDieselFill /></h3></div>
                            <div className="mtitle"><h2>Diesel RS/Liter</h2></div>
                        </div>

                    </div>
                    <div className='b-wrap'>
                        <h3><FaRupeeSign /> {dieselRate !== null ? dieselRate : 0}</h3>
                    </div>
                </div>


                <div className="b-card3">
                    <div className="b-main-title">
                        <div className="b-title">
                            <div className='icn'><h3><BsFillFuelPumpDieselFill /></h3></div>
                            <div className="mtitle"><h2>Diesel Cost</h2></div>
                        </div>

                    </div>
                    <div className='b-wrap'>
                        <h3><FaRupeeSign /> {dieselCost !== null ? dieselCost : 0}</h3>
                    </div>
                </div>

            </div>
            <hr />
            <div className="f-billing4">

                <div className="b1-card1">
                    <div className="b-main-title">
                        <div className="b-title">
                            <div className='icn'><h3><BsFillFuelPumpDieselFill /></h3></div>
                            <div className="mtitle"><h2> B Check Cost</h2></div>
                        </div>

                    </div>
                    <div className='b-wraps'>
                        <h3><FaRupeeSign /> {bCheckCost !== null ? bCheckCost : 0}</h3>
                    </div>
                </div>

                <div className="b1-card1">
                    <div className="b-main-title">
                        <div className="b-title">
                            <div className='icn'><h3><BsFillFuelPumpDieselFill /></h3></div>
                            <div className="mtitle"><h2>AMC Cost</h2></div>
                        </div>

                    </div>
                    <div className='b-wraps'>
                        <h3><FaRupeeSign /> {amcCost !== null ? amcCost : 0}</h3>
                    </div>
                </div>

                <div className="b1-card1">
                    <div className="b-main-title">
                        <div className="b-title">
                            <div className='icn'><h3><BsFillFuelPumpDieselFill /></h3></div>
                            <div className="mtitle"><h2>Diesel Cost</h2></div>
                        </div>

                    </div>
                    <div className='b-wraps'>
                        <h3><FaRupeeSign /> {dieselCost !== null ? dieselCost : 0}</h3>
                    </div>
                </div>

                <div className="b1-card1">
                    <div className="b-main-title">
                        <div className="b-title">
                            <div className='icn'><h3><BsFillFuelPumpDieselFill /></h3></div>
                            <div className="mtitle"><h2>Total Cost</h2></div>
                        </div>

                    </div>
                    <div className='b-wraps'>
                        <h3><FaRupeeSign />{totalCost !== null ? totalCost : 0}</h3>
                    </div>
                </div>
            </div>

            <div className="f-billing4">

                <div className="b1-card1">
                    <div className="b-main-title">
                        <div className="b-title">
                            <div className='icn'><h3><BsFillFuelPumpDieselFill /></h3></div>
                            <div className="mtitle"><h2>DG Generation</h2></div>
                        </div>

                    </div>
                    <div className='b-wraps'>
                        <h3> {dgGeneration !== null ? dgGeneration : 0} Unit</h3>
                    </div>
                </div>

                <div className="b1-card1">
                    <div className="b-main-title">
                        <div className="b-title">
                            <div className='icn'><h3><BsFillFuelPumpDieselFill /></h3></div>
                            <div className="mtitle"><h2>Total Cost</h2></div>
                        </div>

                    </div>
                    <div className='b-wraps'>
                        <h3><FaRupeeSign /> {totalCost !== null ? totalCost : 0}</h3>
                    </div>
                </div>

                <div className="b1-card1">
                    <div className="b-main-title">
                        <div className="b-title">
                            <div className='icn'><h3><BsFillFuelPumpDieselFill /></h3></div>
                            <div className="mtitle"><h2>DG Rs/Unit</h2></div>
                        </div>

                    </div>
                    <div className='b-wraps'>
                        <h3><FaRupeeSign />  {dgRsPerUnit !== null ? dgRsPerUnit.toFixed(2) : 0}</h3>
                    </div>
                </div>

                <div className="b1-card1">
                    <div className="b-main-title">
                        <div className="b-title">
                            <div className='icn'><h3><BsFillFuelPumpDieselFill /></h3></div>
                            <div className="mtitle"><h2>DG Liter/Units</h2></div>
                        </div>

                    </div>
                    <div className='b-wraps'>
                        <h3>{dgLiterPerUnit !== null ? dgLiterPerUnit.toFixed(2) : 0} L</h3>
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
                        <ReactApexChart options={statewd.options} series={statewd.series} type="area" height={360} width={705} />
                    </div>
                </div>
            </div>
        </>
    )
}

export default Dg
