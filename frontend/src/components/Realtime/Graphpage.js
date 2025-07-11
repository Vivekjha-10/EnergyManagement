import React, { useState, useEffect } from 'react'
import './Graphpage.css'
import { Link, useLocation } from 'react-router-dom';
import Chart from 'react-google-charts'

function Graphpage() {
    const location = useLocation();
    let MeterId = 0;
    MeterId = location.state ? location.state : 0;

    const [meterData, setMeterData] = useState([]);
    const [graphData, setGraphData] = useState([]);


    useEffect(() => {
        const fetchData = () => {
            let token = localStorage.getItem('x-auth-token');
            token = token.replace(/"/g, '');

            if (!token) {
                console.error('Authentication token missing');
                return;
            }

            fetch(`http://localhost:4001/Management/api/v1/sidebar/realtime-meter/${MeterId}`, {
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
                        const latestMeterData = {
                            vr: 0,
                            vy: 0,
                            vb: 0,
                            vry: 0,
                            vyb: 0,
                            vbr: 0,
                            cr: 0,
                            cy: 0,
                            cb: 0,
                            pfr: 0,
                            pfy: 0,
                            pfb: 0,
                        };

                        data.Response.ResponseData.list.forEach((meter) => {
                            latestMeterData.vr = meter.voltage_r || 0;
                            latestMeterData.vy = meter.voltage_y || 0;
                            latestMeterData.vb = meter.voltage_b || 0;
                            latestMeterData.vry = meter.voltage_ry || 0;
                            latestMeterData.vyb = meter.voltage_yb || 0;
                            latestMeterData.vbr = meter.voltage_br || 0;
                            latestMeterData.cr = meter.current_r || 0;
                            latestMeterData.cy = meter.current_y || 0;
                            latestMeterData.cb = meter.current_b || 0;
                            latestMeterData.pfr = meter.power_factor_r || 0;
                            latestMeterData.pfy = meter.power_factor_y || 0;
                            latestMeterData.pfb = meter.power_factor_b || 0;
                        });
                        setMeterData(latestMeterData);

                        const latestGraphData = [];

                        data.Response.ResponseData.list.forEach((graph) => {
                            const graphObject = {
                                x: `${graph.time}`,
                                gvr: parseFloat(graph.voltage_r) || 0,
                                gvy: parseFloat(graph.voltage_y) || 0,
                                gvb: parseFloat(graph.voltage_b) || 0,
                                gvry: parseFloat(graph.voltage_ry) || 0,
                                gvyb: parseFloat(graph.voltage_yb) || 0,
                                gvbr: parseFloat(graph.voltage_br) || 0,
                                gcr: parseFloat(graph.current_r) || 0,
                                gcy: parseFloat(graph.current_y) || 0,
                                gcb: parseFloat(graph.current_b) || 0,
                                gpfr: parseFloat(graph.power_factor_r) || 0,
                                gpfy: parseFloat(graph.power_factor_y) || 0,
                                gpfb: parseFloat(graph.power_factor_b) || 0,
                                // Add other properties as needed
                            };
                            latestGraphData.push(graphObject);
                        });

                        setGraphData(latestGraphData);
                    }
                })
                .catch((error) => {
                    console.error('Request failed:', error);
                });
        };

        // Initial fetch
        fetchData();

        // Set up interval to fetch data every minute
        const intervalId = setInterval(fetchData, 60000);

        // Cleanup interval on component unmount
        return () => clearInterval(intervalId);

    }, [MeterId]);

    const LineData = [
        ['x', 'V-R', 'V-Y', 'V-B'],
        ...graphData.slice(-15).map((graph) => [graph.x, graph.gvr, graph.gvy, graph.gvb])
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

    const LineData1 = [
        ['x', 'V R-Y', 'V Y-B', 'V B-R'],
        ...graphData.slice(-15).map((graph) => [graph.x, graph.gvry, graph.gvyb, graph.gvbr])
    ]
    const LineChartOptions1 = {
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


    const LineData2 = [
        ['x', 'C-R', 'C-Y', 'C-B'],
        ...graphData.slice(-15).map((graph) => [graph.x, graph.gcr, graph.gcy, graph.gcb])
    ]
    const LineChartOptions2 = {
        backgroundColor: 'transparent',
        hAxis: {
            title: 'Time',
            titleTextStyle: {
                fontSize: 18,
            },
        },
        vAxis: {
            title: 'Current',
            titleTextStyle: {
                fontSize: 18,
            },
        },
        curveType: 'function',
    }

    const LineData3 = [
        ['x', 'V P-R', 'V P-Y', 'V P-B'],
        ...graphData.slice(-15).map((graph) => [graph.x, graph.gpfr, graph.gpfy, graph.gpfb])
    ]
    const LineChartOptions3 = {
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

    return (
        <div className='graphm'>
            <Link to="/sidebar/realtime" className='nam'>Go Back</Link>
            {(
                <>
                    <div className='set_contain'>
                        <div className="sub_contain">
                            <div className="graphtab">
                                <table>
                                    <tbody>
                                        <>
                                            <tr>
                                                <th>V - R</th>
                                                <th>V - Y</th>
                                                <th>V - B</th>
                                            </tr>
                                            <tr>
                                                <td>{meterData.vr} kwh</td>
                                                <td>{meterData.vy} kwh</td>
                                                <td>{meterData.vb} kwh</td>
                                            </tr>
                                        </>
                                    </tbody>
                                </table>
                            </div>
                            <div className='graph-cover'>{/* <Vcharts /> */}
                                <h2 className='graph-title'> Voltage R-Y-B Graph</h2>
                                {graphData.length > 0 ? (
                                    <Chart
                                        width={'670px'}
                                        height={'310px'}
                                        chartType="LineChart"
                                        loader={<div>Loading Chart</div>}
                                        data={LineData}
                                        options={LineChartOptions}
                                        rootProps={{ 'data-testid': '3' }}
                                    />
                                ) : (
                                    <div className='nodata'>No data available</div>
                                )}
                            </div>
                        </div>

                        <div className="sub_contain">
                            <div className="graphtab">
                                <table>
                                    <tbody>
                                        <tr>
                                            <th>V R-Y</th>
                                            <th>V Y-B</th>
                                            <th>V B-R</th>
                                        </tr>
                                        <tr>
                                            <td>{meterData.vry} kwh</td>
                                            <td>{meterData.vyb} kwh</td>
                                            <td>{meterData.vbr} kwh</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div className='graph-cover'>{/* <Vrycharts /> */}
                                <h2 className='graph-title'>Voltage RY-YB-BR Graph</h2>
                                {graphData.length > 0 ? (
                                    <Chart
                                        width={'670px'}
                                        height={'310px'}
                                        chartType="LineChart"
                                        loader={<div>Loading Chart</div>}
                                        data={LineData1}
                                        options={LineChartOptions1}
                                        rootProps={{ 'data-testid': '3' }}
                                    />
                                ) : (
                                    <div className='nodata'>No data available</div>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className='set_contain'>
                        <div className="sub_contain">
                            <div className="graphtab">
                                <table>
                                    <tbody>
                                        <tr>
                                            <th>C - R</th>
                                            <th>C - Y</th>
                                            <th>C - B</th>
                                        </tr>
                                        <tr>
                                            <td>{meterData.cr} Amp</td>
                                            <td>{meterData.cy} Amp</td>
                                            <td>{meterData.cb} Amp</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div className='graph-cover'>{/* <Currentcharts /> */}
                                <h2 className='graph-title'>Current R-Y-B Graph</h2>
                                {graphData.length > 0 ? (
                                    <Chart
                                        width={'670px'}
                                        height={'310px'}
                                        chartType="LineChart"
                                        loader={<div>Loading Chart</div>}
                                        data={LineData2}
                                        options={LineChartOptions2}
                                        rootProps={{ 'data-testid': '3' }}
                                    />
                                ) : (
                                    <div className='nodata'>No data available</div>
                                )}
                            </div>
                        </div>
                        <div className="sub_contain">
                            <div className="graphtab">
                                <table>
                                    <tbody>
                                        <tr>
                                            <th>PF-R</th>
                                            <th>PF-Y</th>
                                            <th>PF-B</th>
                                        </tr>
                                        <tr>
                                            <td>{meterData.pfr}</td>
                                            <td>{meterData.pfy}</td>
                                            <td>{meterData.pfb}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div className='graph-cover'>{/* <Pfcharts /> */}
                                <h2 className='graph-title'> Power factor R-Y-B Graph</h2>
                                {graphData.length > 0 ? (
                                    <Chart
                                        width={'670px'}
                                        height={'310px'}
                                        chartType="LineChart"
                                        loader={<div>Loading Chart</div>}
                                        data={LineData3}
                                        options={LineChartOptions3}
                                        rootProps={{ 'data-testid': '3' }}
                                    />
                                ) : (
                                    <div className='nodata'>No data available</div>
                                )}
                            </div>
                        </div>
                    </div>
                </>
            )}
        </div>
    )
}

export default Graphpage