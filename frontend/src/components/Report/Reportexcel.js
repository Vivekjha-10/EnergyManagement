import React, { Component } from 'react';
import ReactHTMLTableToExcel from 'react-html-table-to-excel';
import './Reportexcel.css';

class Reportexcel extends Component {

  render() {
    const daysInMonth = new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0).getDate();

    // Assuming some sample values for illustration
    const data = Array(daysInMonth).fill().map((_, index) => ({
      date: new Date(new Date().getFullYear(), new Date().getMonth(), index + 1).toLocaleDateString('en-GB'),
      stateElectricity: Math.floor(Math.random() * 100), // Sample values, replace with actual data
      solar: Math.floor(Math.random() * 1000),
      totalDG: Math.floor(Math.random() * 1000),
      totalTG: Math.floor(Math.random() * 1000),
      gt: Math.floor(Math.random() * 1000),
      others: Math.floor(Math.random() * 1000),
      pcc1: Math.floor(Math.random() * 100),
      pcc2: Math.floor(Math.random() * 100),
      pcc3: Math.floor(Math.random() * 100),
      pcc4: Math.floor(Math.random() * 100),
      pcc5: Math.floor(Math.random() * 100),
      pcc6: Math.floor(Math.random() * 100),
      pcc7: Math.floor(Math.random() * 100),
      pcc8: Math.floor(Math.random() * 100),
      pcc9: Math.floor(Math.random() * 100),
      pcc10: Math.floor(Math.random() * 100),
      pcc11: Math.floor(Math.random() * 100),
      pcc12: Math.floor(Math.random() * 100),
      pcc13: Math.floor(Math.random() * 100),
      pcc14: Math.floor(Math.random() * 100),
      pcc15: Math.floor(Math.random() * 100),
    }));

    // Calculate the sum for each parameter for the entire month
    const sumParameters = {
      stateElectricity: data.reduce((acc, row) => acc + (row.stateElectricity || 0), 0),
      solar: data.reduce((acc, row) => acc + (row.solar || 0), 0),
      totalDG: data.reduce((acc, row) => acc + (row.totalDG || 0), 0),
      totalTG: data.reduce((acc, row) => acc + (row.totalTG || 0), 0),
      gt: data.reduce((acc, row) => acc + (row.gt || 0), 0),
      others: data.reduce((acc, row) => acc + (row.others || 0), 0),
      pcc1: data.reduce((acc, row) => acc + (row.pcc1 || 0), 0),
      pcc2: data.reduce((acc, row) => acc + (row.pcc2 || 0), 0),
      pcc3: data.reduce((acc, row) => acc + (row.pcc3 || 0), 0),
      pcc4: data.reduce((acc, row) => acc + (row.pcc4 || 0), 0),
      pcc5: data.reduce((acc, row) => acc + (row.pcc5 || 0), 0),
      pcc6: data.reduce((acc, row) => acc + (row.pcc6 || 0), 0),
      pcc7: data.reduce((acc, row) => acc + (row.pcc7 || 0), 0),
      pcc8: data.reduce((acc, row) => acc + (row.pcc8 || 0), 0),
      pcc9: data.reduce((acc, row) => acc + (row.pcc9 || 0), 0),
      pcc10: data.reduce((acc, row) => acc + (row.pcc10 || 0), 0),
      pcc11: data.reduce((acc, row) => acc + (row.pcc11 || 0), 0),
      pcc12: data.reduce((acc, row) => acc + (row.pcc12 || 0), 0),
      pcc13: data.reduce((acc, row) => acc + (row.pcc13 || 0), 0),
      pcc14: data.reduce((acc, row) => acc + (row.pcc14 || 0), 0),
      pcc15: data.reduce((acc, row) => acc + (row.pcc15 || 0), 0),
    };

    const TotalsumPCC = sumParameters.pcc1 + sumParameters.pcc2 + sumParameters.pcc3 + sumParameters.pcc4 + sumParameters.pcc5 + sumParameters.pcc6 + sumParameters.pcc7 + sumParameters.pcc8 + sumParameters.pcc9 + sumParameters.pcc10 + sumParameters.pcc11 + sumParameters.pcc12 + sumParameters.pcc13 + sumParameters.pcc14 + sumParameters.pcc15;

    // Calculate the percentage for each parameter
    const percentageParameters = {
      stateElectricity: (sumParameters.stateElectricity * 100 / (sumParameters.stateElectricity + sumParameters.solar + sumParameters.totalDG + sumParameters.totalTG + sumParameters.gt + sumParameters.others)).toFixed(2),
      solar: (sumParameters.solar * 100 / (sumParameters.stateElectricity + sumParameters.solar + sumParameters.totalDG + sumParameters.totalTG + sumParameters.gt + sumParameters.others)).toFixed(2),
      totalDG: (sumParameters.totalDG * 100 / (sumParameters.stateElectricity + sumParameters.solar + sumParameters.totalDG + sumParameters.totalTG + sumParameters.gt + sumParameters.others)).toFixed(2),
      totalTG: (sumParameters.totalTG * 100 / (sumParameters.stateElectricity + sumParameters.solar + sumParameters.totalDG + sumParameters.totalTG + sumParameters.gt + sumParameters.others)).toFixed(2),
      gt: (sumParameters.gt * 100 / (sumParameters.stateElectricity + sumParameters.solar + sumParameters.totalDG + sumParameters.totalTG + sumParameters.gt + sumParameters.others)).toFixed(2),
      others: (sumParameters.others * 100 / (sumParameters.stateElectricity + sumParameters.solar + sumParameters.totalDG + sumParameters.totalTG + sumParameters.gt + sumParameters.others)).toFixed(2),
      pcc1: (sumParameters.pcc1 * 100 / TotalsumPCC).toFixed(2),
      pcc2: (sumParameters.pcc2 * 100 / TotalsumPCC).toFixed(2),
      pcc3: (sumParameters.pcc3 * 100 / TotalsumPCC).toFixed(2),
      pcc4: (sumParameters.pcc4 * 100 / TotalsumPCC).toFixed(2),
      pcc5: (sumParameters.pcc5 * 100 / TotalsumPCC).toFixed(2),
      pcc6: (sumParameters.pcc6 * 100 / TotalsumPCC).toFixed(2),
      pcc7: (sumParameters.pcc7 * 100 / TotalsumPCC).toFixed(2),
      pcc8: (sumParameters.pcc8 * 100 / TotalsumPCC).toFixed(2),
      pcc9: (sumParameters.pcc9 * 100 / TotalsumPCC).toFixed(2),
      pcc10: (sumParameters.pcc10 * 100 / TotalsumPCC).toFixed(2),
      pcc11: (sumParameters.pcc11 * 100 / TotalsumPCC).toFixed(2),
      pcc12: (sumParameters.pcc12 * 100 / TotalsumPCC).toFixed(2),
      pcc13: (sumParameters.pcc13 * 100 / TotalsumPCC).toFixed(2),
      pcc14: (sumParameters.pcc14 * 100 / TotalsumPCC).toFixed(2),
      pcc15: (sumParameters.pcc15 * 100 / TotalsumPCC).toFixed(2),

    };

    const totalGenvalue = sumParameters.stateElectricity + sumParameters.solar + sumParameters.totalDG + sumParameters.totalTG + sumParameters.gt + sumParameters.others;
    const miscConsumption = sumParameters.stateElectricity + sumParameters.solar + sumParameters.totalDG + sumParameters.totalTG + sumParameters.gt + sumParameters.others - (sumParameters.pcc1 + sumParameters.pcc2 + sumParameters.pcc3 + sumParameters.pcc4 + sumParameters.pcc5 + sumParameters.pcc6 + sumParameters.pcc7 + sumParameters.pcc8 + sumParameters.pcc9 + sumParameters.pcc10 + sumParameters.pcc11 + sumParameters.pcc12 + sumParameters.pcc13 + sumParameters.pcc14 + sumParameters.pcc15);

    const Totalstateelectrcitymonth = Math.floor(Math.random() * 8000);
    const Totalsolarmonth = Math.floor(Math.random() * 30000);
    const Totaldgmonth = Math.floor(Math.random() * 9000);
    const Totaltgmonth = Math.floor(Math.random() * 9000);
    const Totalgtmonth = Math.floor(Math.random() * 9000);
    const Totalothersmonth = Math.floor(Math.random() * 9000);
    const Totalgenmonth = Totalstateelectrcitymonth + Totalsolarmonth + Totaldgmonth + Totaltgmonth + Totalgtmonth + Totalothersmonth;
    const Totalpcc1month = Math.floor(Math.random() * 4000);
    const Totalpcc2month = Math.floor(Math.random() * 4000);
    const Totalpcc3month = Math.floor(Math.random() * 4000);
    const Totalpcc4month = Math.floor(Math.random() * 4000);
    const Totalpcc5month = Math.floor(Math.random() * 4000);
    const Totalpcc6month = Math.floor(Math.random() * 4000);
    const Totalpcc7month = Math.floor(Math.random() * 4000);
    const Totalpcc8month = Math.floor(Math.random() * 4000);
    const Totalpcc9month = Math.floor(Math.random() * 4000);
    const Totalpcc10month = Math.floor(Math.random() * 4000);
    const Totalpcc11month = Math.floor(Math.random() * 4000);
    const Totalpcc12month = Math.floor(Math.random() * 4000);
    const Totalpcc13month = Math.floor(Math.random() * 4000);
    const Totalpcc14month = Math.floor(Math.random() * 4000);
    const Totalpcc15month = Math.floor(Math.random() * 4000);
    const Totalconsumptionmonth = Totalpcc1month + Totalpcc2month + Totalpcc3month + Totalpcc4month + Totalpcc5month + Totalpcc6month + Totalpcc7month + Totalpcc8month + Totalpcc9month + Totalpcc10month + Totalpcc11month + Totalpcc12month + Totalpcc13month + Totalpcc14month + Totalpcc15month;
    const Totalmisconsmonth = Totalgenmonth - Totalconsumptionmonth;
  
    return (
      <div className="excelmain">
        <h1>Excel</h1>
            <div className='butt'>
              <ReactHTMLTableToExcel
                id="test-table-xls-button"
                className="download-table-xls-button"
                table="table-to-xls"
                filename="tablexls"
                sheet="tablexls"
                buttonText="Excel"
              />
            </div>


        <div className="exceltable">
          <table id="table-to-xls">
            <thead>
              <tr>
                <th rowSpan={2}>Date</th>
                <th colSpan={7}>GENERATION / SUPPLY( WATTS)</th>
                <th colSpan={17}>ACTUAL CONSUMPTION WATTS</th>
              </tr>
              <tr>
                <th>State Electricity</th>
                <th>Solar</th>
                <th>Total DG</th>
                <th>Total TG</th>
                <th>GT</th>
                <th>Others</th>
                <th>Total Gen Supply</th>
                <th>PCC 1</th>
                <th>PCC 2</th>
                <th>PCC 3</th>
                <th>PCC 4</th>
                <th>PCC 5</th>
                <th>PCC 6</th>
                <th>PCC 7</th>
                <th>PCC 8</th>
                <th>PCC 9</th>
                <th>PCC 10</th>
                <th>PCC 11</th>
                <th>PCC 12</th>
                <th>PCC 13</th>
                <th>PCC 14</th>
                <th>PCC 15</th>
                <th>MISC Cons</th>
                <th>Total Cons</th>
              </tr>
            </thead>
            <tbody>
              {data.map((row, index) => (
                <tr key={index}>
                  <td>{row.date}</td>
                  <td>{row.stateElectricity || 0}</td>
                  <td>{row.solar || 0}</td>
                  <td>{row.totalDG || 0}</td>
                  <td>{row.totalTG || 0}</td>
                  <td>{row.gt || 0}</td>
                  <td>{row.others || 0}</td>
                  <td>{(row.stateElectricity || 0) + (row.solar || 0) + (row.totalDG || 0) + (row.totalTG || 0) + (row.gt || 0) + (row.others || 0)}</td>
                  <td>{row.pcc1 || 0}</td>
                  <td>{row.pcc2 || 0}</td>
                  <td>{row.pcc3 || 0}</td>
                  <td>{row.pcc4 || 0}</td>
                  <td>{row.pcc5 || 0}</td>
                  <td>{row.pcc6 || 0}</td>
                  <td>{row.pcc7 || 0}</td>
                  <td>{row.pcc8 || 0}</td>
                  <td>{row.pcc9 || 0}</td>
                  <td>{row.pcc10 || 0}</td>
                  <td>{row.pcc11 || 0}</td>
                  <td>{row.pcc12 || 0}</td>
                  <td>{row.pcc13 || 0}</td>
                  <td>{row.pcc14 || 0}</td>
                  <td>{row.pcc15 || 0}</td>
                  <td>{(row.stateElectricity || 0) + (row.solar || 0) + (row.totalDG || 0) + (row.totalTG || 0) + (row.gt || 0) + (row.others || 0) - ((row.pcc1 || 0) + (row.pcc2 || 0) + (row.pcc3 || 0) + (row.pcc4 || 0) + (row.pcc5 || 0) + (row.pcc6 || 0) + (row.pcc7 || 0) + (row.pcc8 || 0) + (row.pcc9 || 0) + (row.pcc10 || 0) + (row.pcc11 || 0) + (row.pcc12 || 0) + (row.pcc13 || 0) + (row.pcc14 || 0) + (row.pcc15 || 0))}</td>
                  <td>{(row.pcc1 || 0) + (row.pcc2 || 0) + (row.pcc3 || 0) + (row.pcc4 || 0) + (row.pcc5 || 0) + (row.pcc6 || 0) + (row.pcc7 || 0) + (row.pcc8 || 0) + (row.pcc9 || 0) + (row.pcc10 || 0) + (row.pcc11 || 0) + (row.pcc12 || 0) + (row.pcc13 || 0) + (row.pcc14 || 0) + (row.pcc15 || 0)}</td>
                </tr>
              ))}
              <tr><td colSpan={27}>{' '}</td></tr>
              <tr>
                <th className='tdk'>Total Month</th>
                <td>{sumParameters.stateElectricity}</td>
                <td>{sumParameters.solar}</td>
                <td>{sumParameters.totalDG}</td>
                <td>{sumParameters.totalTG}</td>
                <td>{sumParameters.gt}</td>
                <td>{sumParameters.others}</td>
                <td>{sumParameters.stateElectricity + sumParameters.solar + sumParameters.totalDG + sumParameters.totalTG + sumParameters.gt + sumParameters.others}</td>
                <td>{sumParameters.pcc1}</td>
                <td>{sumParameters.pcc2}</td>
                <td>{sumParameters.pcc3}</td>
                <td>{sumParameters.pcc4}</td>
                <td>{sumParameters.pcc5}</td>
                <td>{sumParameters.pcc6}</td>
                <td>{sumParameters.pcc7}</td>
                <td>{sumParameters.pcc8}</td>
                <td>{sumParameters.pcc9}</td>
                <td>{sumParameters.pcc10}</td>
                <td>{sumParameters.pcc11}</td>
                <td>{sumParameters.pcc12}</td>
                <td>{sumParameters.pcc13}</td>
                <td>{sumParameters.pcc14}</td>
                <td>{sumParameters.pcc15}</td>
                <td>{sumParameters.stateElectricity + sumParameters.solar + sumParameters.totalDG + sumParameters.totalTG + sumParameters.gt + sumParameters.others - (sumParameters.pcc1 + sumParameters.pcc2 + sumParameters.pcc3 + sumParameters.pcc4 + sumParameters.pcc5 + sumParameters.pcc6 + sumParameters.pcc7 + sumParameters.pcc8 + sumParameters.pcc9 + sumParameters.pcc10 + sumParameters.pcc11 + sumParameters.pcc12 + sumParameters.pcc13 + sumParameters.pcc14 + sumParameters.pcc15)}</td>
                <td>{sumParameters.pcc1 + sumParameters.pcc2 + sumParameters.pcc3 + sumParameters.pcc4 + sumParameters.pcc5 + sumParameters.pcc6 + sumParameters.pcc7 + sumParameters.pcc8 + sumParameters.pcc9 + sumParameters.pcc10 + sumParameters.pcc11 + sumParameters.pcc12 + sumParameters.pcc13 + sumParameters.pcc14 + sumParameters.pcc15}</td>
              </tr>
              <tr>
                <th className='tdk'>%</th>
                <td>{percentageParameters.stateElectricity}</td>
                <td>{percentageParameters.solar}</td>
                <td>{percentageParameters.totalDG}</td>
                <td>{percentageParameters.totalTG}</td>
                <td>{percentageParameters.gt}</td>
                <td>{percentageParameters.others}</td>
                <td>{totalGenvalue * 100 / totalGenvalue}</td>
                <td>{percentageParameters.pcc1}</td>
                <td>{percentageParameters.pcc2}</td>
                <td>{percentageParameters.pcc3}</td>
                <td>{percentageParameters.pcc4}</td>
                <td>{percentageParameters.pcc5}</td>
                <td>{percentageParameters.pcc6}</td>
                <td>{percentageParameters.pcc7}</td>
                <td>{percentageParameters.pcc8}</td>
                <td>{percentageParameters.pcc9}</td>
                <td>{percentageParameters.pcc10}</td>
                <td>{percentageParameters.pcc11}</td>
                <td>{percentageParameters.pcc12}</td>
                <td>{percentageParameters.pcc13}</td>
                <td>{percentageParameters.pcc14}</td>
                <td>{percentageParameters.pcc15}</td>
                <td>{(miscConsumption * 100 / TotalsumPCC).toFixed(2)}</td>
                <td>{TotalsumPCC * 100 / TotalsumPCC}</td>
              </tr>
              <tr>
                <td colSpan={27}></td>
              </tr>
              <tr>
                <td className='tdk'>Jan-2023</td>
                <td>{Totalstateelectrcitymonth}</td>
                <td>{Totalsolarmonth}</td>
                <td>{Totaldgmonth}</td>
                <td>{Totaltgmonth}</td>
                <td>{Totalgtmonth}</td>
                <td>{Totalothersmonth}</td>
                <td>{Totalgenmonth}</td>
                <td>{Totalpcc1month}</td>
                <td>{Totalpcc2month}</td>
                <td>{Totalpcc3month}</td>
                <td>{Totalpcc4month}</td>
                <td>{Totalpcc5month}</td>
                <td>{Totalpcc6month}</td>
                <td>{Totalpcc7month}</td>
                <td>{Totalpcc8month}</td>
                <td>{Totalpcc9month}</td>
                <td>{Totalpcc10month}</td>
                <td>{Totalpcc11month}</td>
                <td>{Totalpcc12month}</td>
                <td>{Totalpcc13month}</td>
                <td>{Totalpcc14month}</td>
                <td>{Totalpcc15month}</td>
                <td>{Totalmisconsmonth}</td>
                <td>{Totalconsumptionmonth}</td>
              </tr>
              <tr>
                <td className='tdk'>Feb-2023</td>
                <td>{Totalstateelectrcitymonth}</td>
                <td>{Totalsolarmonth}</td>
                <td>{Totaldgmonth}</td>
                <td>{Totaltgmonth}</td>
                <td>{Totalgtmonth}</td>
                <td>{Totalothersmonth}</td>
                <td>{Totalgenmonth}</td>
                <td>{Totalpcc1month}</td>
                <td>{Totalpcc2month}</td>
                <td>{Totalpcc3month}</td>
                <td>{Totalpcc4month}</td>
                <td>{Totalpcc5month}</td>
                <td>{Totalpcc6month}</td>
                <td>{Totalpcc7month}</td>
                <td>{Totalpcc8month}</td>
                <td>{Totalpcc9month}</td>
                <td>{Totalpcc10month}</td>
                <td>{Totalpcc11month}</td>
                <td>{Totalpcc12month}</td>
                <td>{Totalpcc13month}</td>
                <td>{Totalpcc14month}</td>
                <td>{Totalpcc15month}</td>
                <td>{Totalmisconsmonth}</td>
                <td>{Totalconsumptionmonth}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>



    )
  }
}
export default Reportexcel;
