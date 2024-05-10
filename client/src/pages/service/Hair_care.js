import React from 'react'
import ServiceNavBar from './content/serviceNavBar/serviceNav';
import ServiceDetails from'./content/service_details/Hair_details';
import useServiceFetcher from './useServiceFetcher'; // Import the custom hook

const Hair_care = () => {
  const { services, serviceType, setServiceType } = useServiceFetcher('Hair Care');

  return (
    <div className='headder'>
      <ServiceNavBar setServiceType={setServiceType} />
      <ServiceDetails services={services} />
    </div>
  );
};

export default Hair_care;
