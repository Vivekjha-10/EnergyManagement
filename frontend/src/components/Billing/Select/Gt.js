import React, { useState, useEffect } from 'react';
import { FaRupeeSign, FaGasPump } from 'react-icons/fa';
import './css/Gt.css';
import { Chart } from 'react-google-charts';
import ReactApexChart from 'react-apexcharts';

function Gt() {
  const [gtData, setGtData] = useState({
    amcCost: 0,
    gasCost: 0,
    spareConsumptionCost: 0,
  });
  const [gtUnitsGeneration, setGtUnitsGeneration] = useState(0);
  const [gtTotalCost, setGtTotalCost] = useState(0);
  const [ gtrsperunit, setGtRsperUnit]= useState(0);

  useEffect(() => {
    let token = localStorage.getItem(`x-auth-token`);
    token = token.replace(/"/g, '');
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
          const gtApiResponse = data.Response.ResponseData.gas_trubine;

          // Update state with the extracted data
          setGtData({
            amcCost: gtApiResponse.amc_cost,
            gasCost: gtApiResponse.gas_cost,
            spareConsumptionCost: gtApiResponse.spare_consumption_cost,
          });

          const gtTotalCost =
            parseFloat(gtApiResponse.spare_consumption_cost) +
            parseFloat((gtApiResponse.amc_cost / 12).toFixed(2)) +
            parseFloat(gtApiResponse.gas_cost);

          setGtTotalCost(gtTotalCost);

          const unitsGeneration =
            parseFloat(gtApiResponse.unit_generation_max) -
            parseFloat(gtApiResponse.unit_generation_min);

          // Update state with the calculated GT Units Generation
          setGtUnitsGeneration(unitsGeneration);

          const gtRsperUnits =  unitsGeneration !== 0 ? (gtTotalCost / unitsGeneration) : 0 ;
          setGtRsperUnit(gtRsperUnits)

          const seriesData = data.Response.ResponseData.line_graph.gas_trubine.map(item => ({
            x: new Date(item.year, item.month),
            y: item.max_power_generation - item.min_power_generation,
        }));


        setStatewGt((prevStatew) => ({
            ...prevStatew,
            series: [{
                name: 'GT',
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
    ['Task', 'Value'],
    ['Spare Consumption', parseFloat(gtData.spareConsumptionCost)],
    ['AMC Cost by Month', parseFloat((gtData.amcCost / 12).toFixed(2))],
    ['Gas Cost', parseFloat(gtData.gasCost)],
  ];

  const options = {
    title: 'GT Electrical Generation Cost',
    is3D: true,
    colors: ['#4DC7FF', '#08A6F0', '#26AEED'],
  };

  const [statewgt, setStatewGt] = useState({
    series: [
      {
        name: 'GT',
        data: [],
      },
    ],
    options: {
      chart: {
        height: 350,
        type: 'area',
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: 'smooth',
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
          format: 'dd/MM/yy',
        },
      },
    },
  });

  return (
    <>
      <div className="f-billing">
        <div className="gb-card1">
          <div className="b-main-title">
            <div className="b-title">
              <div className="icn">
                <h3>
                  <FaGasPump />
                </h3>
              </div>
              <div className="mtitle">
                <h2>Spare Consumption Cost</h2>
              </div>
            </div>
          </div>
          <div className="b-wrap">
            <h3>
              <FaRupeeSign /> {gtData.spareConsumptionCost}
            </h3>
          </div>
        </div>

        <div className="gb-card1">
          <div className="b-main-title">
            <div className="b-title">
              <div className="icn">
                <h3>
                  <FaGasPump />
                </h3>
              </div>
              <div className="mtitle">
                <h2>AMC Cost</h2>
              </div>
            </div>
          </div>
          <div className="b-wrap">
            <h3>
              <FaRupeeSign /> {gtData.amcCost}
            </h3>
          </div>
        </div>

        <div className="gb-card1">
          <div className="b-main-title">
            <div className="b-title">
              <div className="icn">
                <h3>
                  <FaGasPump />
                </h3>
              </div>
              <div className="mtitle">
                <h2>Gas Cost</h2>
              </div>
            </div>
          </div>
          <div className="b-wrap">
            <h3>
              <FaRupeeSign /> {gtData.gasCost}
            </h3>
          </div>
        </div>
      </div>

      <div className="f-billing">
        <div className="gb-card1">
          <div className="b-main-title">
            <div className="b-title">
              <div className="icn">
                <h3>
                  <FaGasPump />
                </h3>
              </div>
              <div className="mtitle">
                <h2>Total Cost</h2>
              </div>
            </div>
          </div>
          <div className="b-wrap">
            <h3>
              <FaRupeeSign /> {gtTotalCost}
            </h3>
          </div>
        </div>

        <div className="gb-card1">
          <div className="b-main-title">
            <div className="b-title">
              <div className="icn">
                <h3>
                  <FaGasPump />
                </h3>
              </div>
              <div className="mtitle">
                <h2>GT Units Generation</h2>
              </div>
            </div>
          </div>
          <div className="b-wrap">
            <h3>{gtUnitsGeneration} Unit</h3>
          </div>
        </div>

        <div className="gb-card1">
          <div className="b-main-title">
            <div className="b-title">
              <div className="icn">
                <h3>
                  <FaGasPump />
                </h3>
              </div>
              <div className="mtitle">
                <h2>GT RS/Unit</h2>
              </div>
            </div>
          </div>
          <div className="b-wrap">
            <h3>
              <FaRupeeSign /> {gtrsperunit}
            </h3>
          </div>
        </div>
      </div>

      <div className="containgraph">
        <div className="pie-chart">
          <Chart
            chartType="PieChart"
            data={data}
            options={options}
            width={'100%'}
            height={'410px'}
          />
        </div>
        <div className="linegraph-cover">
          <div id="chart">
            <ReactApexChart
              options={statewgt.options}
              series={statewgt.series}
              type="area"
              height={360}
              width={705}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default Gt;
