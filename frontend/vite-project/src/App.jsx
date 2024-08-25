import React, { useContext, useEffect, useState } from 'react';
import 'leaflet/dist/leaflet.css';
import './App.css';
import DistanceContextProvider, { DistanceContext } from './context/useDistance';
import MainAppContent from './pages/MainAppContent';


function App() {
  const [latitude, setLatitude] = useState(0.0);
  const [longitude, setLongitude] = useState(0.0);
  const [pilotData, setData] = useState([]);

 
  useEffect(() => {
    const getPosition = () => {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLatitude(position.coords.latitude);
          setLongitude(position.coords.longitude);
        },
        (error) => {
          console.error('Error getting location:', error);
        }
      );
    };
    
    getPosition();

    const getData = async () => {
      try {
        console.log("Fetching data");
        const res = await fetch("http://localhost:8001/", {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          }
        });
        const { data } = await res.json();
        console.log(data);
        setData(data);
      } catch (err) {
        console.error('Error fetching data:', err);
      }
    };

    getData();
  }, []);

  return (
    <DistanceContextProvider>
      {latitude!==0.0 && longitude!==0.0 ?<MainAppContent latitude={latitude} longitude={longitude} pilotData={pilotData} />:<></>}
    </DistanceContextProvider>
  );
}

export default App;
