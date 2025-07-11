import React, { useState, useEffect } from 'react'
import { FaRupeeSign } from 'react-icons/fa'
import { GiPowerGenerator } from 'react-icons/gi'
import './css/Tg.css'
import { Chart } from "react-google-charts";
import ReactApexChart from "react-apexcharts";

function Tg() {

    const [tgData, setTgData] = useState({
        amcCost: 0,
        gasCost: 0,
        spareConsumptionCost: 0,
    });
    const [ tgUnitsGeneration, setTgUnitsGeneration ] = useState(0);
    const [ tgtotalcost, setTgTotalCost] = useState(0);
    const [ tgrsperunit, setTgRsperUnit] = useState(0);

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
                    const tgApiResponse = data.Response.ResponseData.trubine_generator;

                    // Update state with the extracted data
                    setTgData({
                        amcCost: tgApiResponse.amc_cost,
                        steamCost: tgApiResponse.steam_cost,
                        spareConsumptionCost: tgApiResponse.spare_consumption_cost,
                    });

                    const tgTotalCost = (parseFloat(tgApiResponse.spare_consumption_cost)) + parseFloat((tgApiResponse.amc_cost / 12).toFixed(2)) + (parseFloat(tgApiResponse.steam_cost))
                    setTgTotalCost(tgTotalCost);

                    const unitsGeneration =
                        (parseFloat(tgApiResponse.unit_generation_1_max) - parseFloat(tgApiResponse.unit_generation_1_min)) +
                        (parseFloat(tgApiResponse.unit_generation_2_max) - parseFloat(tgApiResponse.unit_generation_2_min));

                    // Update state with the calculated TG Units Generation
                    setTgUnitsGeneration(unitsGeneration);

                    const tgRsperUnits =  unitsGeneration !== 0 ? (tgTotalCost / unitsGeneration) : 0 ;
                    setTgRsperUnit(tgRsperUnits)

                    const allTgData = [
                        ...data.Response.ResponseData.line_graph.trubine_generator_set_1,
                        ...data.Response.ResponseData.line_graph.trubine_generator_set_2,
                        
                    ];

                    const seriesData = allTgData.map((item) => ({
                        x: new Date(item.year, item.month),
                        y: item.max_power_generation - item.min_power_generation,
                      }));
                  
                    setStateTg((prevStatew) => ({
                        ...prevStatew,
                        series: [
                            {
                                name: 'TG',
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

    }, []);

    const data = [
        ["Task", "Hours per Day"],
        ["Spare Consumtion", parseFloat(tgData.spareConsumptionCost)],
        ["AMC Cost by Month", parseFloat((tgData.amcCost/ 12 ).toFixed(2))],
        ["Steam Cost", parseFloat(tgData.steamCost)],

    ];

    const options = {
        title: "TG Electrical Generation Cost",
        is3D: true,
        colors: ["#00C853", "#0BA035", "#02B14B"]
    };

    const [statewtg, setStateTg ] = useState({
        series: [{
            name: 'TG',
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

                <div className="tb-card1">
                    <div className="b-main-title">
                        <div className="b-title">
                            <div className='icn'><h3><GiPowerGenerator />
                            </h3></div>
                            <div className="mtitle"><h2>Spare Consumption Cost</h2></div>
                        </div>

                    </div>
                    <div className='b-wrap'>
                        <h3><FaRupeeSign />  {tgData.spareConsumptionCost}</h3>
                    </div>
                </div>

                <div className="tb-card1">
                    <div className="b-main-title">
                        <div className="b-title">
                            <div className='icn'><h3><GiPowerGenerator />
                            </h3></div>
                            <div className="mtitle"><h2>AMC Cost</h2></div>
                        </div>

                    </div>
                    <div className='b-wrap'>
                        <h3><FaRupeeSign /> {tgData.amcCost}</h3>
                    </div>
                </div>

                <div className="tb-card1">
                    <div className="b-main-title">
                        <div className="b-title">
                            <div className='icn'><h3><GiPowerGenerator />
                            </h3></div>
                            <div className="mtitle"><h2>Steam Cost</h2></div>
                        </div>

                    </div>
                    <div className='b-wrap'>
                        <h3><FaRupeeSign /> {tgData.steamCost}</h3>
                    </div>
                </div>

            </div>

            <div className="f-billing">

                <div className="tb-card1">
                    <div className="b-main-title">
                        <div className="b-title">
                            <div className='icn'><h3><GiPowerGenerator />
                            </h3></div>
                            <div className="mtitle"><h2>Total Cost</h2></div>
                        </div>

                    </div>
                    <div className='b-wrap'>
                        <h3><FaRupeeSign /> {tgtotalcost}</h3>
                    </div>
                </div>

                <div className="tb-card1">
                    <div className="b-main-title">
                        <div className="b-title">
                            <div className='icn'><h3><GiPowerGenerator />
                            </h3></div>
                            <div className="mtitle"><h2>TG Units Generation</h2></div>
                        </div>

                    </div>
                    <div className='b-wrap'>
                        <h3>{tgUnitsGeneration} Units</h3>
                    </div>
                </div>

                <div className="tb-card1">
                    <div className="b-main-title">
                        <div className="b-title">
                            <div className='icn'><h3><GiPowerGenerator />
                            </h3></div>
                            <div className="mtitle"><h2>TG RS/Unit</h2></div>
                        </div>

                    </div>
                    <div className='b-wrap'>
                        <h3><FaRupeeSign /> {tgrsperunit}</h3>
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
                        <ReactApexChart options={statewtg.options} series={statewtg.series} type="area" height={360} width={705} />
                    </div>
                </div>
            </div>
        </>
    )
}

export default Tg
