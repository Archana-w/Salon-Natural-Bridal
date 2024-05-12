import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Hair_details.css';

function HairDetails() {
  const [services, setServices] = useState([]);
  const [selectedService, setSelectedService] = useState(null);

  useEffect(() => {
    axios.get("http://localhost:5000/service")
      .then(response => {
        if (Array.isArray(response.data)) {
          const hairCareServices = response.data.filter(service => service.sType === 'Nail care');
          setServices(hairCareServices);
        } else {
          console.error("Invalid response data:", response.data);
        }
      })
      .catch(error => {
        console.error("Error fetching services:", error);
      });
  }, []);

  const handleMakeAppointment = (serviceId) => {
    // Implement your logic to handle making an appointment
    console.log("Appointment for service with ID:", serviceId);
  };

  return (
    <div className="container">
      {services.map(service => (
        <div key={service._id} className='service-info'>
          <div className='s_image'>
            <img className='service_details_image' src={"http://localhost:5000/image/" + service.imageUrl} alt="Service Image" />
            <div className="service-name">{service.sName}</div>
          </div>
          <div className="details">
            <div>
              <p className='service-n-c'>{service.sName}<strong>:</strong></p>
            </div>
            <div>
              <p className='service-desc'>{service.sDescription}</p>
            </div>
            <div>
              <p className='price'>LKR {service.sPrice}</p>
            </div>
            <div className='button-pos'>
              <button onClick={() => window.location.href='/create-app'} className='service_app_button'>Make an Appointment</button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default HairDetails;
