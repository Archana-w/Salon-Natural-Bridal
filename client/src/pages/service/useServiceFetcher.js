import { useState, useEffect } from 'react';

const useServiceFetcher = (initialServiceType) => {
  const [services, setServices] = useState([]);
  const [serviceType, setServiceType] = useState(initialServiceType);

  useEffect(() => {
    // Fetch services based on the service type
    fetchServices(serviceType);
  }, [serviceType]);

  const fetchServices = async (type) => {
    try {
      const response = await fetch(`http://localhost:5000/api/service?type=${type}`);
      const data = await response.json();
      setServices(data);
    } catch (error) {
      console.error('Error fetching services:', error);
    }
  };

  return { services, serviceType, setServiceType }; // Expose setServiceType function
};

export default useServiceFetcher;
