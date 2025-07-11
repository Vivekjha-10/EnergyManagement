import React, { useState, useEffect } from 'react';
import './Assignmeter.css'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

function Assignmeter() {
  const MySwal = withReactContent(Swal);

  const [departments, setDepartments] = useState([]);
  const [selectedDepartment, setSelectedDepartment] = useState(null);
  const [meterName, setMeterName] = useState('');
  const [meterNumber, setMeterNumber] = useState('');
  const [meterType, setMeterType] = useState('main');
  const [date, setDate] = useState('');
  const [ctRatio, setCTRatio] = useState(''); 
  const [multiplyingFactor, setMultiplyingFactor] = useState('');

  const handleDepartmentChange = (e) => {
    const selectedDepartmentId = e.target.value;
    const department = departments.find((d) => d.id === parseInt(selectedDepartmentId, 10));
    setSelectedDepartment(department);
  };

  useEffect(() => {
    let token = localStorage.getItem(`x-auth-token`);
    token = token.replace(/"/g, '');
    if (!token) {
      console.error('Authentication token missing');
      return;
    }
  
    fetch('http://localhost:4001/Management/api/v1/sidebar/list-department', {
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
          setDepartments(data.Response.ResponseData.list);
          if (data.Response.ResponseData.list.length > 0) {
            // Set the default selected department to the first department in the list
            setSelectedDepartment(data.Response.ResponseData.list[0].name);
          }
  
          // Set the last_meter_assigned value to the meterNumber state
          setMeterNumber(data.Response.ResponseData.last_meter_assigned);
        }
      })
      .catch((error) => {
        console.error('Fetching department data failed:', error);
      });
  }, []);
  


 // ... (previous code)

const handleSubmit = () => {
  let token = localStorage.getItem(`x-auth-token`);
  token = token.replace(/"/g, '');
  if (!token) {
    console.error('Authentication token missing');
    return;
  }

  // You need to replace this with the actual API endpoint
  const apiUrl = 'http://localhost:4001/Management/api/v1/sidebar/assigning-meter';

  const requestData = {
    name_of_department: selectedDepartment ? selectedDepartment.id : null,
    name_of_meter: meterName,
    date_of_creation: date,
    meter_number: meterNumber,
    type_of_meter: meterType,
    ct_ratio: ctRatio,
    multiplying_factor: multiplyingFactor,
  };

  // Make the POST request
  fetch(apiUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-auth-token': `${token}`,
    },
    body: JSON.stringify(requestData),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error('Failed to submit data');
      }
      return response.json();
    })
    .then((data) => {
      if (data.Response.Status.StatusCode === '0') {
        MySwal.fire({
          title: <strong>Data Added Successfully!</strong>,
          icon: 'success',
        });

        // Reset form fields
        setSelectedDepartment(null);
        setMeterName('');
        setMeterType('');
        setDate('');
        setCTRatio('');
        setMultiplyingFactor('');

        // Update Meter Number if provided in the response
        if (data.Response.ResponseData && data.Response.ResponseData.meter_number) {
          setMeterNumber(data.Response.ResponseData.meter_number);
        }

        // Fetch the latest meter number after successful submission
        fetch('http://localhost:4001/Management/api/v1/sidebar/list-department', {
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
              setMeterNumber(data.Response.ResponseData.last_meter_assigned);
            }
          })
          .catch((error) => {
            console.error('Fetching department data failed:', error);
          });
      } else if (data.Response.Status.ErrorCode === '021') {
        MySwal.fire({
          title: <strong>Meter number is already assigned to another area!</strong>,
          icon: 'warning',
        });
      } else if (data.Response.Status.StatusCode === '1') {
        // Customize this part to handle a successful registration, if needed
        MySwal.fire({
          title: <strong>Check all field before passing data!</strong>,
          icon: 'warning',
        });
      }
      // Add any additional logic or state updates after successful submission
    })
    .catch((error) => {
      console.error('Submission failed:', error);
      // Handle errors or display a message to the user
    });
};

  return (
    <div className='assign'>
      <div className='formstyle'>
        <div className='nam'>
          <span>Assignmeter</span>
        </div>

        <div className="part">
          <div className="sel">
            <h4>Name of Department :</h4>
            <select value={selectedDepartment ? selectedDepartment.id : ''} onChange={(e) => handleDepartmentChange(e)}>
              <option value="" disabled>Select Department</option>
              {departments.map((department) => (
                <option key={department.id} value={department.id}>
                  {department.name}
                </option>
              ))}
            </select>
          </div>

          <div className="dat">
            <h4>Date of Creation : </h4>
            <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
          </div>
        </div>

        <div className="part">
          <div className="met">
            <h4>Name of Meter : </h4>
            <input type="text" value={meterName} onChange={(e) => setMeterName(e.target.value)} />
          </div>

          <div className="met">
            <h4>Meter Number : </h4>
            <input type="number" value={meterNumber} onChange={(e) => setMeterNumber(e.target.value)} readOnly/>
          </div>
        </div>

        <div className="part">
          <div className="met">
            <h4>CT Ratio : </h4>
            <input type="text" value={ctRatio} onChange={(e) => setCTRatio(e.target.value)} />
          </div>

          <div className="met">
            <h4>Multiplying Factor : </h4>
            <input type="text" value={multiplyingFactor} onChange={(e) => setMultiplyingFactor(e.target.value)} />
          </div>
        </div>

        <div className="part">
          <div className="mets">
            <h4>Types of Meter : </h4>
            <div className="radio_button">
              <input
                type="radio"
                name="gender"
                value="Main"
                style={{ fontSize: "41px" }}
                checked={meterType === 'Main'}
                onChange={() => setMeterType('Main')}
              />{' '} Main
              <input
                type="radio"
                name="gender"
                value="Sub"
                checked={meterType === 'Sub'}
                onChange={() => setMeterType('Sub')}
              />{' '} Sub
            </div>
          </div>
        </div>


        <div className="wrapbtn">
          <button className="button" onClick={handleSubmit}>Submit</button>
        </div>

      </div>
    </div>
  )
}

export default Assignmeter
