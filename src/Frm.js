import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './styles.css';

const Frm = () => {
  const [data, setData] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    about: '',
    dob: '',
    gender: '',
    status: '',
    education: '',
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:3002/api/data');
      setData(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const addData = async () => {
    try {
      await axios.post('http://localhost:3002/api/data', formData); 
      setFormData({
        name: '',
        about: '',
        dob: '',
        gender: '',
        status: '',
        education: '',
      });
      fetchData();
    } catch (error) {
      console.error(error);
    }
  };

  const deleteData = async (id) => {
    try {
      await axios.delete(`http://localhost:3002/api/data/${id}`); 
      fetchData();
    } catch (error) {
      console.error(error);
    }
  };

  const updateData = async (id, newData) => {
    try {
      await axios.put(`http://localhost:3002/api/data/${id}`, newData); 
      fetchData();
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className='container'>
      <div className='form-container'>
        <h2>Student Data</h2>
        <input
          type='text'
          name='name'
          placeholder='Name'
          value={formData.name}
          onChange={handleChange}
        />
        <input
          type='text'
          name='about'
          placeholder='About'
          value={formData.about}
          onChange={handleChange}
        />
        <input
          type='date'
          name='dob'
          placeholder='Date of Birth'
          value={formData.dob}
          onChange={handleChange}
        />
        <select name='gender' value={formData.gender} onChange={handleChange}>
          <option value=''>Select Gender</option>
          <option value='male'>Male</option>
          <option value='female'>Female</option>
          <option value='other'>Other</option>
        </select>
        <select name='status' value={formData.status} onChange={handleChange}>
          <option value=''>Select Status</option>
          <option value='single'>Single</option>
          <option value='married'>Married</option>
          <option value='divorced'>Divorced</option>
          <option value='widowed'>Widowed</option>
        </select>
        <input
          type='text'
          name='education'
          placeholder='Education'
          value={formData.education}
          onChange={handleChange}
        />
        <button onClick={addData}>Add</button>
      </div>

      <div className='data-container'>
        <h2>Data List</h2>
        {data.map((item) => (
          <div key={item.id} className='data-item'>
            <p>Name: {item.name}</p>
            <p>About: {item.about}</p>
            <p>Date of Birth: {item.dob}</p>
            <p>Gender: {item.gender}</p>
            <p>Status: {item.status}</p>
            <p>Education: {item.education}</p>
            <div>
              <button onClick={() => deleteData(item.id)}>Delete</button>
              <button
                onClick={() =>
                  updateData(item.id, {
                    name: 'New Name',
                    about: 'New About',
                    dob: 'New DOB',
                    gender: 'New Gender',
                    status: 'New Status',
                    education: 'New Education',
                  })
                }
              >
                Update
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Frm;











