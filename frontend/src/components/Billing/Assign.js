import React, { useState, useEffect } from 'react'
import './Assign.css'
import { Box, useTheme } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
// import { mockDataContacts } from "../../data/mockData.js";

function Report() {

  const [tableData, setTableData] = useState([])
  useEffect(() => {
    let token = localStorage.getItem(`x-auth-token`);
    token = token.replace(/"/g, '');
    if (!token) {
      console.error('Authentication token missing');
      return;
    }
    fetch('http://localhost:4001/Management/api/v1/sidebar/cost-evaluation-details', {
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
          setTableData(data.Response.ResponseData.list);
        }
      })
      .catch((error) => {
        console.error('Fetching department data failed:', error);
      });
  }, [])

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const columns = [
    { field: 'id', headerName: 'Id', width: 150 },
    {
      field: 'date',
      headerName: 'Date',
      type: 'date',
      width: 150,
      valueGetter: (params) => new Date(params.row.date),
      valueFormatter: (params) => {
        const date = new Date(params.value);
        const day = date.getDate();
        const month = date.getMonth() + 1; // Months are zero-based
        const year = date.getFullYear();

        // Ensure leading zeros for day and month
        const formattedDay = day < 10 ? `0${day}` : day;
        const formattedMonth = month < 10 ? `0${month}` : month;

        return `${formattedDay}/${formattedMonth}/${year}`;
      },
    },

    {
      field: 'created_at',
      headerName: 'Created At',
      type: 'dateTime',
      width: 200,
      valueGetter: (params) => new Date(params.row.created_at),
      valueFormatter: (params) => {
        const date = new Date(params.value);
        const day = date.getDate();
        const month = date.getMonth() + 1; // Months are zero-based
        const year = date.getFullYear();

        // Ensure leading zeros for day, month, hours, minutes, and seconds
        const formattedDay = day < 10 ? `0${day}` : day;
        const formattedMonth = month < 10 ? `0${month}` : month;

        return `${formattedDay}/${formattedMonth}/${year}`;
      },
    },

    {
      field: 'created_at_time',
      headerName: 'Created At Time',
      type: 'dateTime',
      width: 200,
      valueGetter: (params) => new Date(params.row.created_at),
      valueFormatter: (params) => {
        const date = new Date(params.value);
        const hours = date.getHours();
        const minutes = date.getMinutes();
        const seconds = date.getSeconds();

        // Ensure leading zeros for day, month, hours, minutes, and seconds
        const formattedHours = hours < 10 ? `0${hours}` : hours;
        const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
        const formattedSeconds = seconds < 10 ? `0${seconds}` : seconds;

        return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
      },
    },
    {
      field: 'created_by',
      headerName: 'Created By',
      width: 150,
    },
    {
      field: 'is_deleted',
      headerName: 'Is Deleted',
      valueFormatter: (params) => (params.value === 1 ? 'Yes' : params.value === 0 ? 'No' : ''),
      width: 120,
    },
    {
      field: 'duration',
      headerName: 'Duration',
      width: 150,
    },
    {
      field: 'expired_date',
      headerName: 'Expired Date',
      width: 150,
      valueFormatter: (params) => {
        const date = new Date(params.value);
        const day = date.getDate();
        const month = date.getMonth() + 1; // Months are zero-based
        const year = date.getFullYear();

        // Ensure leading zeros for day, month, hours, minutes, and seconds
        const formattedDay = day < 10 ? `0${day}` : day;
        const formattedMonth = month < 10 ? `0${month}` : month;

        return `${formattedDay}/${formattedMonth}/${year}`;
      },
    },
    {
      field: 'generation_name',
      headerName: "Generation Name",
      width: 150,
    },
    {
      field: 'parameter_type_name',
      headerName: "Parameter Type Name",
      width: 150,
    },
    {
      field: 'parameter_value',
      headerName: "Parameter Value",
      width: 150,
    }
   
  ];
  return (
    <>


      <Box m="2rem">
        <Box
          m="8px 0 0 0"
          width="90rem"
          height="80vh"
          sx={{

            "& .MuiDataGrid-root": {
              border: "none",
              boxShadow: 8,
              marginTop: 12,


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
              backgroundColor: colors.grey[700],
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
              backgroundColor: colors.grey[700],
            },
            "& .MuiCheckbox-root": {
              fontSize: 30,
              fontWeight: '500',
              color: `${colors.greenAccent[200]} !important`,
            },
            "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
              fontSize: 12,
              fontWeight: '500',
              color: `${colors.grey[150]} !important`,
            },
          }}
        >
          <DataGrid
            rows={tableData}
            columns={columns}
            pageSize={10}
            components={{ Toolbar: GridToolbar }}
          // rowsPerPageOptions={[5, 10, 25, { label: "All", value: -1 }]}
          />
        </Box>
      </Box>



    </>
  )
}

export default Report
