import React, { useEffect, useState } from 'react';
import { FaGasPump } from 'react-icons/fa';
import { MdElectricMeter, MdSolarPower } from 'react-icons/md';
import { GiPowerGenerator, GiTurbine } from 'react-icons/gi';
import { HiEllipsisHorizontalCircle } from 'react-icons/hi2'
import './Dashboard.css';
import ReactApexChart from "react-apexcharts";
import { Chart } from "react-google-charts";


function Dashboard() {
  const [cardData, setCardData] = useState({
    msedcl: 0,
    solar: 0,
    totalDG: 0,
    totalTG: 0,
    gt: 0,
    others: 0,
    dgSet1: 0,
    dgSet2: 0,
    dgSet3: 0,
    dgSet4: 0,
    tgSet1: 0,
    tgSet2: 0,
  });

  const [filter, setFilter] = useState('week');

  useEffect(() => {
    let token = localStorage.getItem(`x-auth-token`);
    token = token.replace(/"/g, "")
    if (!token) {
      console.error('Authentication token missing');
      return;
    }

    fetch(`http://localhost:4001/Management/api/v1/sidebar/dashboard?filter=${filter}`, {
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
        if (data.Response.Status.StatusCode === "0") {
          const initialGenerationData = data.Response.ResponseData.initial_generation;
          setCardData({
            msedcl: initialGenerationData.energy_meter_1,
            solar: initialGenerationData.energy_meter_2,
            totalDG: (
              parseFloat(initialGenerationData.energy_meter_3) +
              parseFloat(initialGenerationData.energy_meter_4) +
              parseFloat(initialGenerationData.energy_meter_5) +
              parseFloat(initialGenerationData.energy_meter_6)
            ).toFixed(2),
            totalTG: (
              parseFloat(initialGenerationData.energy_meter_7) +
              parseFloat(initialGenerationData.energy_meter_8)
            ).toFixed(2),
            gt: initialGenerationData.energy_meter_9,
            others: initialGenerationData.energy_meter_10,
            dgSet1: initialGenerationData.energy_meter_3,
            dgSet2: initialGenerationData.energy_meter_4,
            dgSet3: initialGenerationData.energy_meter_5,
            dgSet4: initialGenerationData.energy_meter_6,
            tgSet1: initialGenerationData.energy_meter_7,
            tgSet2: initialGenerationData.energy_meter_8,
          });
        }
      })
      .catch((error) => {
        console.error('Request failed:', error);
      });

  }, [filter]);


  const [statedash] = useState({
    series: [{
      name: 'MSEDCL',
      data: [44, 55, 41, 67, 22, 43, 44]
    }, {
      name: 'SOLAR',
      data: [13, 23, 20, 8, 13, 27, 52]
    }, {
      name: 'Total DG',
      data: [11, 17, 15, 15, 21, 14, 22]
    }, {
      name: 'Total TG',
      data: [22, 20, 21, 26, 13, 19, 23]
    }, {
      name: 'GT',
      data: [13, 23, 20, 8, 13, 27, 19]
    }, {
      name: 'Others',
      data: [13, 23, 20, 8, 13, 24, 22]
    }
    ],
    options: {
      chart: {
        type: 'bar',
        height: 500,
        stacked: true,
        toolbar: {
          show: true
        },
        zoom: {
          enabled: true
        }
      },
      responsive: [{
        breakpoint: 480,
        options: {
          legend: {
            position: 'bottom',
            offsetX: -10,
            offsetY: 0
          }
        }
      }],
      plotOptions: {
        bar: {
          horizontal: false,
          borderRadius: 10,
          dataLabels: {
            total: {
              enabled: true,
              style: {
                fontSize: '15px',
                fontWeight: 900
              }
            }
          }
        },
      },
      xaxis: {
        type: 'datetime',
        categories: ['01/01/2023 GMT', '01/02/2023 GMT', '01/03/2023 GMT', '01/04/2023 GMT',
          '01/05/2023 GMT', '01/06/2023 GMT', '01/07/2023 GMT'
        ],
      },
      yaxis: {
        title: {
          text: 'KWH',
          style: {
            color: "#3C3CF0",
            fontSize: '18px'
          }
        },
        labels: {
          style: {
            fontWeight: 700,
          },
        }
      },
      colors: ["#7E57C2", "#409AE9", "#F55F54", "#00C853", "#4DC7FF", "#6FFFA6"],
      legend: {
        position: 'right',
        offsetY: 40
      },
      fill: {
        opacity: 1
      }
    },
  });

  const data = [
    ["Name", "KWH"],
    ["MSEDCL", parseFloat(cardData.msedcl)],
    ["SOLAR", parseFloat(cardData.solar)],
    ["Total DG", parseFloat(cardData.totalDG)],
    ["Total TG", parseFloat(cardData.totalTG)],
    ["GT", parseFloat(cardData.gt)],
    ["Others", parseFloat(cardData.others)],
  ];

  const options = {
    chartArea: {
      left: "15%",
      top: "20%",
      right: "1",
    },
    is3D: true,
    colors: ["#7E57C2", "#409AE9", "#F55F54", "#00C853", "#4DC7FF", "#3DEF81"]
  };

  const totalGeneration = (
    parseFloat(cardData.msedcl) +
    parseFloat(cardData.solar) +
    parseFloat(cardData.totalDG) +
    parseFloat(cardData.totalTG) +
    parseFloat(cardData.gt) +
    parseFloat(cardData.others)
  );

  const percentage = (value) => ((parseFloat(value) / totalGeneration) * 100).toFixed(2) + '%';


  return (
    <>
      <h3 className='text'>Generation</h3>
      <div className="flexcontainer">
        <div className="card1">
          <div className="main-title">
            <div className="icon">
              <h3><MdElectricMeter /></h3>
            </div>
            <div className="title">
              <h2>MSEDCL</h2>
            </div>
          </div>
          <div className='wrap'>
            <h3>{cardData.msedcl}</h3> KWH
          </div>
        </div>
        <div className="card2">
          <div className="main-title">
            <div className="icon1">
              <h3><MdSolarPower /> </h3>
            </div>
            <div className="title">
              <h2>SOLAR</h2>
            </div>
          </div>
          <div className='wrap'>
            <h3>{cardData.solar}</h3> KWH
          </div>
        </div>
        <div className="card3">
          <div className="main-title">
            <div className="icon2">
              <h3><FaGasPump /> </h3>
            </div>
            <div className="title">
              <h2>Total DG</h2>
            </div>
          </div>
          <div className='wrap'>
            <h3>{cardData.totalDG}</h3> KWH
          </div>
        </div>
      </div>

      <div className="chart-cover">
        <div className='chart-top'>
          <div className='sel-opt'>
            <select value={filter} onChange={(e) => setFilter(e.target.value)}>
              <option value="week">Week</option>
              <option value="month">Month</option>
              <option value="year">Year</option>
            </select>
            <div className='chart-title'>
              <h2>Generation Chart</h2>
            </div>
          </div>
          <hr />
          <div id="chart">
            <ReactApexChart options={statedash.options} series={statedash.series} type="bar" height={400} width={950} />
          </div>
        </div>
        <div className="flexcontainers">
          <div className="cards4">
            <div className="main-title">
              <div className="icon4">
                <h3><GiPowerGenerator /> </h3>
              </div>
              <div className="title">
                <h2>Total TG</h2>
              </div>
            </div>
            <div className='wrap1'>
              <h3>{cardData.totalTG}</h3> KWH
            </div>
          </div>
          <div className="cards5">
            <div className="main-title">
              <div className="icon5">
                <h3><GiTurbine /> </h3>
              </div>
              <div className="title">
                <h2>GT</h2>
              </div>
            </div>
            <div className='wrap1'>
              <h3>{cardData.gt}</h3> KWH
            </div>
          </div>
          <div className="cards6">
            <div className="main-title">
              <div className="icon6">
                <h3><HiEllipsisHorizontalCircle /> </h3>
              </div>
              <div className="title">
                <h2>Others</h2>
              </div>
            </div>
            <div className='wrap1'>
              <h3>{cardData.others}</h3> KWH
            </div>
          </div>
        </div>
      </div>

      <div className="chart-cover">
        <div className="chart-today">
          <div className='piechart-title1'>
            <h2>Today Generation</h2>
          </div>
          <hr />
          <Chart
            chartType="PieChart"
            data={data}
            options={options}
            width={"490px"}
            height={"400px"}
          />
        </div>
        <div>
          <div className="tday-table">
            <table>
              <tbody>
                <tr>
                  <th>MSEDCL</th>
                  <th>SOLAR</th>
                  <th>Total DG</th>
                  <th>Total TG</th>
                  <th>GT</th>
                  <th>Others</th>
                </tr>
                <tr>
                  <td>{`${cardData.msedcl} KWH (${percentage(cardData.msedcl)})`}</td>
                  <td>{`${cardData.solar} KWH (${percentage(cardData.solar)})`}</td>
                  <td>{`${cardData.totalDG} KWH (${percentage(cardData.totalDG)})`}</td>
                  <td>{`${cardData.totalTG} KWH (${percentage(cardData.totalTG)})`}</td>
                  <td>{`${cardData.gt} KWH (${percentage(cardData.gt)})`}</td>
                  <td>{`${cardData.others} KWH (${percentage(cardData.others)})`}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className='flexcards'>
            <div className="scard1">
              <div className="main-title1">
                <div className="sicon">
                  <h3><FaGasPump /> </h3>
                </div>
                <div className="stitle">
                  <h4>DG SET-1</h4>
                </div>
              </div>
              <div className='swrap'>
                <h5>{cardData.dgSet1}</h5> KWH
              </div>
            </div>

            <div className="scard1">
              <div className="main-title1">
                <div className="sicon">
                  <h3><FaGasPump /> </h3>
                </div>
                <div className="stitle">
                  <h4>DG SET-2</h4>
                </div>
              </div>
              <div className='swrap'>
                <h5>{cardData.dgSet2}</h5> KWH
              </div>
            </div>

          </div>
          <div className='flexcards'>
            <div className="scard1">
              <div className="main-title1">
                <div className="sicon">
                  <h3><FaGasPump /> </h3>
                </div>
                <div className="stitle">
                  <h4>DG SET-3</h4>
                </div>
              </div>
              <div className='swrap'>
                <h5>{cardData.dgSet3}</h5> KWH
              </div>
            </div>

            <div className="scard1">
              <div className="main-title1">
                <div className="sicon">
                  <h3><FaGasPump /> </h3>
                </div>
                <div className="stitle">
                  <h4>DG SET-4</h4>
                </div>
              </div>
              <div className='swrap'>
                <h5>{cardData.dgSet4}</h5> KWH
              </div>
            </div>

          </div>
          <div className='flexcards'>
            <div className="scard2">
              <div className="main-title1">
                <div className="sicon1">
                  <h3><GiPowerGenerator /> </h3>
                </div>
                <div className="stitle">
                  <h4>TG SET-1</h4>
                </div>
              </div>
              <div className='swrap'>
                <h5>{cardData.tgSet1}</h5> KWH
              </div>
            </div>

            <div className="scard2">
              <div className="main-title1">
                <div className="sicon1">
                  <h3><GiPowerGenerator /> </h3>
                </div>
                <div className="stitle">
                  <h4>TG SET-2</h4>
                </div>
              </div>
              <div className='swrap'>
                <h5>{cardData.tgSet2}</h5> KWH
              </div>
            </div>

          </div>
        </div>

      </div >

    </>
  )
}

export default Dashboard
