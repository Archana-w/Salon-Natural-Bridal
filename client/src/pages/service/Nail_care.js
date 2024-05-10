import React from 'react';
import './Nail_care';
import ServiceNavBar from './content/serviceNavBar/serviceNav';
import ServiceDetails from'./content/service_details/Nail_details';
import useServiceFetcher from './useServiceFetcher'; // Import the custom hook

const Nail_care = () => {
  const { services, serviceType, setServiceType } = useServiceFetcher('Nail Care');

  return (
    <div>
      <ServiceNavBar setServiceType={setServiceType} />
      <ServiceDetails services={services} />
    </div>
  );
};

export default Nail_care;