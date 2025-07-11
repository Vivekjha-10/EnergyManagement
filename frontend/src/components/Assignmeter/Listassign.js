import React, { useState, useEffect } from 'react'
import './Listassign.css'
import { Box, useTheme } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme.js";
// import { mockDataContacts } from "../../data/mockData.js";

function Listassign() {
  
  const [tableData, setTableData] = useState([])
  useEffect(() => {
    let token = localStorage.getItem(`x-auth-token`);
    token = token.replace(/"/g, '');
    if (!token) {
      console.error('Authentication token missing');
      return;
    }
    fetch('http://localhost:4001/Management/api/v1/sidebar/assigning-meter-details', {
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
    { field: 'id', headerName: 'Id', width: 100 },
    {
      field: 'name_of_meter',
      headerName: 'Name of meter',
      width: 200,
    },
 
    {
      field: 'name_of_department',
      headerName: 'Name of department',
      width: 200,
    },
    {
      field: 'meter_number',
      headerName: 'Meter Number',
      width: 200,
    },
    {
      field: 'type_of_meter',
      headerName: 'Type of meter',
      width: 200,
    },
    {
      field: 'ct_ratio',
      headerName: 'CT Ratio',
      width: 200,
    },
    {
      field: 'multiplying_factor',
      headerName: 'Multiplying Factor',
      width: 200,
    },
    {
      field: 'date_of_creation',
      headerName: 'Date of creation',
      width: 200,
    },
    {
      field: 'created_by',
      headerName: 'Created By',
      width: 200,
    },
    {
      field: 'is_deleted',
      headerName: 'Is Deleted',
      valueFormatter: (params) => (params.value === 1 ? 'Yes' : params.value === 0 ? 'No' : ''),
      width: 120,
    },
   
     
  ];
  return (
    <>

        <Box  m="2rem">
          <Box
            m="8px 0 0 0"
            width="90rem"
            height="80vh"
            sx={{
                     
              "& .MuiDataGrid-root": {
                border: "none",
                boxShadow: 8,
                marginTop:12,
                

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
                overflow:"auto",
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
              components={{ Toolbar: GridToolbar }}
              rowsPerPageOptions={[5, 10, 25, { label: "All", value: -1 }]}
            />
          </Box>
        </Box>

   

    </>
  )
}

export default Listassign
