import React from 'react';
import './Skin_care';
import ServiceNavBar from './content/serviceNavBar/serviceNav';
import ServiceDetails from'./content/service_details/Skin_details';
import useServiceFetcher from './useServiceFetcher'; // Import the custom hook

const Skin_care = () => {
  const { services, serviceType, setServiceType } = useServiceFetcher('Skin Care');

  return (
    <div>
      <ServiceNavBar setServiceType={setServiceType} />
      <ServiceDetails services={services} />
    </div>
  );
};

export default Skin_care;
