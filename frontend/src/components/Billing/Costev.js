import React, { useState, useEffect } from 'react';
import './Costev.css';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

function Costev() {
  const [generatorsData, setGeneratorsData] = useState([]);
  const [selectedGenerator, setSelectedGenerator] = useState('');
  const [selectedParameter, setSelectedParameter] = useState('');
  const [parameterNames, setParameterNames] = useState([]);
  const [durationOptions, setDurationOptions] = useState([]);
  const [staffName, setStaffName] = useState('');
  const [selectedDurationId, setSelectedDurationId] = useState('');

  const MySwal = withReactContent(Swal);

  useEffect(() => {
    let token = localStorage.getItem(`x-auth-token`);
    token = token.replace(/"/g, '');
    if (!token) {
      console.error('Authentication token missing');
      return;
    }

    const storedStaffName = sessionStorage.getItem('fullname');
    setStaffName(storedStaffName);

    fetch('http://localhost:4001/Management/api/v1/sidebar/list-cost-evaluation', {
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
          setGeneratorsData(data.Response.ResponseData.list || []);

          const allParameterNames = data.Response.ResponseData.list.reduce(
            (accumulator, item) =>
              accumulator.concat(item.generation_parameter?.list?.map((param) => param.gen_parameter_name) || []),
            []
          );
          setParameterNames(allParameterNames);

          setDurationOptions(data.Response.ResponseData.duration.list);
        }
      })
      .catch((error) => {
        console.error('Request failed:', error);
      });
  }, []);

  // Update parameter names when the selected generator changes
  useEffect(() => {
    if (selectedGenerator) {
      const selectedGeneratorData = generatorsData.find((generator) => generator.generators === selectedGenerator);
      if (selectedGeneratorData) {
        const selectedGeneratorParameterNames =
          selectedGeneratorData.generation_parameter?.list?.map((param) => param.gen_parameter_name) || [];
        setParameterNames(selectedGeneratorParameterNames);
      }
    }
  }, [selectedGenerator, generatorsData]);

  const handleSubmit = () => {
    let token = localStorage.getItem(`x-auth-token`);
    token = token.replace(/"/g, '');
    if (!token) {
      console.error('Authentication token missing');
      return;
    }

    // You need to replace this with the actual API endpoint
    const apiUrl = 'http://localhost:4001/Management/api/v1/sidebar/cost-evaluation';

    const selectedParameterValue = document.getElementById('parameterValue').value;
    const selectedGeneratorData = generatorsData.find((generator) => generator.generators === selectedGenerator);
    const selectedParameterData =
      selectedGeneratorData &&
      selectedGeneratorData.generation_parameter.list.find((param) => param.gen_parameter_name === selectedParameter);

    // Retrieve the date value
    const selectedDate = document.getElementById('date').value;

    const selectedDuration = document.getElementById('selectedDuration').value;
    const selectedDurationData = durationOptions.find((duration) => duration.name === selectedDuration);
    const selectedDurationId = selectedDurationData ? selectedDurationData.id : '';
    
    // Check if all required fields are filled
    if (!selectedGenerator || !selectedParameter || !selectedParameterValue || !selectedDate || !selectedDurationId) {
      // Show SweetAlert for missing fields
      MySwal.fire({
        title: <strong>All fields are required!</strong>,
        icon: 'warning',
      });
      return;
    }


    // Prepare the data to be sent in the request body
    const requestData = {
      generation_id: selectedGeneratorData.id,
      generation_name: selectedGeneratorData.generators,
      parameter_type_id: selectedParameterData.id,
      parameter_type_name: selectedParameterData.gen_parameter_name,
      date: selectedDate,
      parameter_value: selectedParameterValue,
      duration_id: selectedDurationId,
      duration: selectedDuration,
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
          document.getElementById('parameterValue').value = '';
          document.getElementById('date').value = '';
          setSelectedGenerator('');
          setSelectedParameter('');
          setSelectedDurationId('');
          MySwal.fire({
            title: <strong>Data Added Successfully!</strong>,
            icon: 'success',
          });
        } else if (data.Response.Status.StatusCode === '1') {
          // Customize this part to handle a successful registration, if needed
          MySwal.fire({
            title: <strong>Error in passing data!</strong>,
            icon: 'error',
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
    <>
      <div className="cont">
        <div className="sform" style={{ maxWidth: '125rem', height: '650px' }}>
          <div className="card-custom">
            <div className="two_part">
              <div className="dat">
                <h4>Date :</h4>
                <input type="date" id="date" name="date" />
              </div>

              <div className="input_div">
                <h4>Generator : </h4>
                <select
                  value={selectedGenerator}
                  onChange={(e) => {
                    setSelectedGenerator(e.target.value);
                    setSelectedParameter('');
                  }}
                >
                  <option value="" disabled >Select Generator</option>
                  {generatorsData.map((generator, id) => (
                    <option key={id} value={generator.generators}>
                      {generator.generators}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="two_part">
              <div className="input_div">
                <h4>Parameter Name :</h4>
                <select
                  value={selectedParameter}
                  onChange={(e) => setSelectedParameter(e.target.value)}
                  disabled={!selectedGenerator}
                >
                  <option value="" disabled>Select Parameter Name</option>
                  {parameterNames.map((parameter, id) => (
                    <option key={id} value={parameter}>
                      {parameter}
                    </option>
                  ))}
                </select>
              </div>

              <div className="input_div">
                <h4>Parameter Value : </h4>
                <input
                  type="number"
                  id="parameterValue"
                  name="parameterValue"
                  step="0.01"
                  placeholder="Enter Parameter Value"
                  required />
              </div>
            </div>

            <div className="two_part">
              <div className="input_div">
                <h4>Duration Time : </h4>
                <select
                  id="selectedDuration"
                  value={selectedDurationId}
                  onChange={(e) => setSelectedDurationId(e.target.value)}
                >
                  <option value="" disabled>
                    Select Duration
                  </option>
                  {durationOptions.map((duration) => (
                    <option key={duration.id} value={duration.name}>
                      {duration.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="input_div name_div">
                <h4>Staff Name : </h4>
                <input type="text" className="input" style={{ fontWeight: '700' }} value={staffName} readOnly />
              </div>
            </div>

            <div className="enb_but">
              <button onClick={handleSubmit}> Submit </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Costev;
