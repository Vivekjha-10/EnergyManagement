import React, { useState } from 'react'
import './Billing.css';
import Msedcl from './Select/Msedcl'
import Solar from './Select/Solar'
import Dg from './Select/Dg'
import Tg from './Select/Tg'
import Gt from './Select/Gt'

function Billing() {
  const [selected, setselected] = useState('State Electricity')

  const handleChange = (e) => {
    setselected(e.target.value)
  }
  return (
    <>

      <div className="box-billing">
        <div className='header'>
          <p>Billing</p>
        </div>
        <div className="contain3">

          <div className="side_box">
            <div className="productname">
              <select value={selected} onChange={(e) => handleChange(e)}>
                <option>State Electricity</option>
                <option>DG</option>
                <option>SOLAR</option>
                <option>TG</option>
                <option>GT</option>
              </select></div>
            {/* <div className="timebox">
              <select>
                <option >Daily</option>
                <option >Weekly</option>
                <option >Monthly</option>
                <option >6 Month</option>
                <option >Yearly</option>
              </select>
            </div> */}
          </div>
        </div>
        <div className="option_box">
          {selected === "State Electricity" ? <Msedcl /> : ""}
          {selected === "DG" ? <Dg /> : ""}
          {selected === "SOLAR" ? <Solar /> : ""}
          {selected === "TG" ? <Tg /> : ""}
          {selected === "GT" ? <Gt /> : ""}
        </div>

      </div>
    </>
  )
}

export default Billing
