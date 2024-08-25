import React, { useContext } from "react";
import { MapContainer, Marker, Popup, TileLayer,CircleMarker,Circle } from 'react-leaflet';
import L from 'leaflet';
import { Search } from './Search';
import { Show } from './Show';
import { DistanceContext } from "../context/useDistance";

export default function MainAppContent({ latitude, longitude, pilotData }) {
    const customIcon = new L.Icon({
      iconUrl: "https://imgs.search.brave.com/nkgcWODI32A6bDd5ipWfMCuJh8K1xYmIWsQ_vx5u_20/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly93d3cu/aWNvbnNkYi5jb20v/aWNvbnMvcHJldmll/dy9yZWQvbWFya2Vy/LXh4bC5wbmc",
      iconSize: [38, 45],
      iconAnchor: [22, 45],
      popupAnchor: [-3, -46],
    });
  
    const { Distance } = useContext(DistanceContext);
  
    return (
      <div className="h-svh">
        <div className='flex w-full justify-center items-center'>
          <a href='#search'>
            <button className='mx-auto bg-blue-600 text-white p-3 text-xl m-5 border rounded-lg'>
              Search Pilot Near Me
            </button>
          </a>
        </div>
        <div>
          <MapContainer center={[latitude,longitude]} zoom={16}>
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={[latitude, longitude]} icon={customIcon}>
              <Popup className="custom-admin-wrapper">
                <h1>Admin</h1>
              </Popup>
            </Marker>
            {pilotData.map((pilot) => (
              <Marker
                key={pilot.id}
                position={[pilot.GeolocationCoordinates.latitude, pilot.GeolocationCoordinates.longitude]}
              >
                <Popup>
                  <div className='flex flex-col'>
                    <img src={pilot.profileImage} className='h-10 w-10 mx-auto mb-4' alt="Pilot" />
                    <h1>Name: {pilot.name}</h1>
                    <h1>Work Experience: {pilot.workExperience}</h1>
                  </div>
                </Popup>
              </Marker>
            ))}
            <Circle center={[latitude,longitude]} radius={Distance} />
          </MapContainer>
        </div>
        <div id="search">
          {Distance===0?<Search/>:<Show latitude={latitude} longitude={longitude} distance={Distance}/>}
        </div>
      </div>
    );
  }
  