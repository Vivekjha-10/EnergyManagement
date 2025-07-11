import React, { useState, useEffect } from 'react'
import './Report.css'
import { Box, useTheme } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";

function Report() {

  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [gridData, setGridData] = useState([]);

  useEffect(() => {
    let token = localStorage.getItem(`x-auth-token`);
    token = token.replace(/"/g, '');
    if (!token) {
      console.error('Authentication token missing');
      return;
    }

    const apiUrl = `http://localhost:4001/Management/api/v1/sidebar/report?filter[start_date]=${startDate}&filter[end_date]=${endDate}`;

    fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-auth-token': `${token}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to fetch department data');
        }
        return response.json();
      })
      .then((data) => {
        if (data.Response.Status.StatusCode === '0') {
          const energyMeterData = data.Response.ResponseData;
          let idCounter = 1;

          const formattedData = Object.keys(energyMeterData).flatMap((meterName) => {
            const meterList = energyMeterData[meterName]?.list || [];
            return meterList.map((item) => ({
              id: idCounter++,
              meterName,
              date: item.date,
              va_sum: item.va_sum,
              var_sum: item.var_sum,
              watt_sum: item.watt_sum,
              current_b: item.current_b,
              current_r: item.current_r,
              current_y: item.current_y,
              frequency: item.frequency,
              voltage_b: item.voltage_b,
              voltage_r: item.voltage_r,
              voltage_y: item.voltage_y,
              created_at: item.created_at,
              va_average: item.va_average,
              voltage_br: item.voltage_br,
              voltage_ry: item.voltage_ry,
              voltage_yb: item.voltage_yb,
              current_sum: item.current_sum,
              var_average: item.var_average,
              voltage_sum: item.voltage_sum,
              power_export: item.power_export,
              power_import: item.power_import,
              watt_average: item.watt_average,
              active_power_b: item.active_power_b,
              active_power_r: item.active_power_r,
              active_power_y: item.active_power_y,
              power_factor_b: item.power_factor_b,
              power_factor_r: item.power_factor_r,
              power_factor_y: item.power_factor_y,
              current_average: item.current_average,
              voltage_average: item.voltage_average,
              apparent_power_r: item.apparent_power_r,
              apparent_power_y: item.apparent_power_y,
              power_factor_sum: item.power_factor_sum,
              reactive_power_b: item.reactive_power_b,
              reactive_power_r: item.reactive_power_r,
              reactive_power_y: item.reactive_power_y,
              power_factor_average: item.power_factor_average,
            }));
          });

          setGridData(formattedData.flat());
        }
      })
      .catch((error) => {
        console.error('Fetching department data failed:', error);
      });
  }, [startDate, endDate]);


  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const columns = [
    { field: 'id', headerName: 'Id', width: 100 },
    { field: 'meterName', headerName: 'Meter Name', width: 150 },
    { field: 'date', headerName: 'Date', width: 150 },
    { field: 'va_sum', headerName: 'VA Sum', width: 150 },
    { field: 'var_sum', headerName: 'VAR Sum', width: 150 },
    { field: 'watt_sum', headerName: 'Watt Sum', width: 150 },
    { field: 'current_b', headerName: 'Current B', width: 150 },
    { field: 'current_r', headerName: 'Current R', width: 150 },
    { field: 'current_y', headerName: 'Current Y', width: 150 },
    { field: 'frequency', headerName: 'Frequency', width: 150 },
    { field: 'voltage_b', headerName: 'Voltage B', width: 150 },
    { field: 'voltage_r', headerName: 'Voltage R', width: 150 },
    { field: 'voltage_y', headerName: 'Voltage Y', width: 150 },
    { field: 'created_at', headerName: 'Created At', width: 150 },
    { field: 'va_average', headerName: 'VA Average', width: 150 },
    { field: 'voltage_br', headerName: 'Voltage BR', width: 150 },
    { field: 'voltage_ry', headerName: 'Voltage RY', width: 150 },
    { field: 'voltage_yb', headerName: 'Voltage YB', width: 150 },
    { field: 'current_sum', headerName: 'Current Sum', width: 150 },
    { field: 'var_average', headerName: 'VAR Average', width: 150 },
    { field: 'voltage_sum', headerName: 'Voltage Sum', width: 150 },
    { field: 'power_export', headerName: 'Power Export', width: 150 },
    { field: 'power_import', headerName: 'Power Import', width: 150 },
    { field: 'watt_average', headerName: 'Watt Average', width: 150 },
    { field: 'active_power_b', headerName: 'Active Power B', width: 150 },
    { field: 'active_power_r', headerName: 'Active Power R', width: 150 },
    { field: 'active_power_y', headerName: 'Active Power Y', width: 150 },
    { field: 'power_factor_b', headerName: 'Power Factor B', width: 150 },
    { field: 'power_factor_r', headerName: 'Power Factor R', width: 150 },
    { field: 'power_factor_y', headerName: 'Power Factor Y', width: 150 },
    { field: 'current_average', headerName: 'Current Average', width: 150 },
    { field: 'voltage_average', headerName: 'Voltage Average', width: 150 },
    { field: 'apparent_power_r', headerName: 'Apparent Power R', width: 150 },
    { field: 'apparent_power_y', headerName: 'Apparent Power Y', width: 150 },
    { field: 'power_factor_sum', headerName: 'Power Factor Sum', width: 150 },
    { field: 'reactive_power_b', headerName: 'Reactive Power B', width: 150 },
    { field: 'reactive_power_r', headerName: 'Reactive Power R', width: 150 },
    { field: 'reactive_power_y', headerName: 'Reactive Power Y', width: 150 },
    { field: 'power_factor_average', headerName: 'Power Factor Average', width: 150 },
  ];
  return (
    <>
      <div className='maincontent'>
        <div className='datepicker'>
          <div className='from'>
            <p>From Date : </p>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
          </div>

          <div className='to'>
            <p>To Date : </p>
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
            />
          </div>
        </div>


        <Box m="2rem">
          <Box
            m="8px 0 0 0"
            width="90rem"
            height="68vh"
            sx={{

              "& .MuiDataGrid-root": {
                border: "none",
                boxShadow: 8,

              },
              "& .MuiDataGrid-cell": {
                borderBottom: "none",
                fontSize: 15
              },
              "& .name-column--cell": {
                color: colors.greenAccent[300],
                fontSize: 20,
                fontWeight: '500',
              },
              "& .MuiDataGrid-columnHeaders": {
                backgroundColor: colors.blueAccent[700],
                borderBottom: "none",
                fontSize: 19,
                fontWeight: '500',
              },
              "& .MuiDataGrid-virtualScroller": {
                backgroundColor: colors.primary[400],
                overflow: "auto",
                scrollbarWidth: '2px',
                '&::-webkit-scrollbar': {
                  width: 6,
                  height: 6,
                  backgroundColor: 'transparent',
                },
                '&::-webkit-scrollbar-track': {
                  background: "#f1f1f1",
                },
                '&::-webkit-scrollbar-thumb': {
                  borderRadius: 6,
                  backgroundColor: '#6C23AA',
                },

              },
              "& .MuiDataGrid-footerContainer": {
                borderTop: "none",
                fontSize: 20,
                fontWeight: '500',
                backgroundColor: colors.blueAccent[700],
              },
              "& .MuiCheckbox-root": {
                fontSize: 30,
                fontWeight: '500',
                color: `${colors.greenAccent[200]} !important`,
              },
              "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
                fontSize: 12,
                fontWeight: '500',
                color: `${colors.grey[100]} !important`,
              },
            }}
          >
            <DataGrid
              rows={gridData}
              columns={columns}
              components={{ Toolbar: GridToolbar }}
            />
          </Box>
        </Box>

      </div>

    </>
  )
}

export default Report
