import './Realtime.css'
import { useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from "react";
import GaugeComponent from 'react-gauge-component'


function Realtime() {

  const [cards, setCards] = useState([]);
  useEffect(() => {
    let token = localStorage.getItem(`x-auth-token`);
    token = token.replace(/"/g, "")
    if (!token) {
      console.error('Authentication token missing');
      return;
    }

    fetch('http://localhost:4001/Management/api/v1/sidebar/realtime', {
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

          const updatedCards = data.Response.ResponseData.list.map((meter) => ({
            title: meter.name_of_meter || 'Unknown Meter',
            pv: meter.meter_values ? meter.meter_values.watt_average : '0',
            vv: meter.meter_values ? meter.meter_values.voltage_average : '0',
            cv: meter.meter_values ? meter.meter_values.current_average : '0',
            meterid: meter.meter_number || '0',
          }));
          setCards(updatedCards);
        }
      })
      .catch((error) => {
        console.error('Request failed:', error);
      });

  }, []);


  const power = (value) => {
    if (value >= 0) {
      if (Number.isInteger(value)) {
        return value.toFixed(0) + 'kw';
      } else {
        return value.toFixed(1) + 'kw';
      }
    } else {
      return value.toFixed(0) + 'kw';
    }
  }

  const navigate = useNavigate();

  const handleNavigateToGraph = (meterid) => {
    // Use the navigate function to navigate to the '/sidebar/graph' route
    navigate(`/sidebar/graph`, { state:  meterid});
  };


  return (
    <>
      <section>
        <div className="containe">
          <div className="cards">
            {
              cards.map((card, i) => (
                <div key={i} className="rcard">
                  <h3>{card.title || 'Unknown Meter'}</h3>
                  <hr />
                  <div className='rmeter'>
                    <GaugeComponent
                      arc={{
                        nbSubArcs: 150,
                        colorArray: ['#F5CD19', '#EA4228', '#5BE12C'],
                        width: 0.3,
                        padding: 0.003,
                        
                      }}
                      labels={{
                        valueLabel: {
                          fontSize: "15px",
                          formatTextValue: power,
                        },
                        tickLabels: {
                          type: "outer",
                          ticks: [
                            { value: 5000 },
                            { value: 10000 },
                            { value: 15000 },
                            { value: 20000 },
                            { value: 25000 },
                          ],
                          valueConfig: {
                            formatTextValue: power,
                          }
                        }
                      }}
                      value={card.pv}
                      maxValue={25000}
                    />
                    <div className='rgraph-name'>Power</div>
                  </div>
                  <p>Voltage - <span className='right'>{card.vv} Volt</span></p>
                  <p>Current - <span className='right'>{card.cv} Amp</span></p>
                  <div className="Viewbutton" >
                      <button
                        // key={i}
                        onClick={() => handleNavigateToGraph(card.meterid)} // Pass the meterid here
                        id="main_containers"
                        className='buttn'
                      >
                        View More
                      </button>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </section>
    </>
  )
}

export default Realtime