import React, { useContext, useState } from 'react';
import DistanceContextProvider, { DistanceContext } from '../context/useDistance';

export const Search = () => {
  const [distance, setdistance] = useState('');
  const [unit, setUnit] = useState('km');

  const {setDistance}=useContext(DistanceContext);

  const handleSubmit = () => {
    
    const num = parseInt(distance);
    if (!Number.isInteger(num)) {
      window.alert("Please enter a valid integer");
      return;
    }
    let fDistance;
    if (unit === 'km') {
      fDistance = num * 1000;
    } else {
      fDistance = num;
    }
    setdistance(fDistance);
    setDistance(fDistance);
  };

  return (
    <DistanceContextProvider>
    <div className="flex justify-center items-center w-full p-4">
      <div className="w-full md:w-1/3 lg:w-1/4 mx-auto border rounded-2xl shadow-lg shadow-blue-200 flex flex-col bg-white">
        <label className="text-lg md:text-2xl mx-auto mt-4 text-blue-400">Enter Distance</label>
        <select 
          onChange={(e) => setUnit(e.target.value)} 
          className="mx-4 mt-4 md:mx-10 mb-4 border border-blue-300 h-10 p-2 rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
        >
          <option value="km">Kilometers (km)</option>
          <option value="m">Meters (m)</option>
        </select>
        <input 
          type="text"
          onChange={(e) => setdistance(e.target.value)} 
          placeholder="500" 
          className="mx-4 md:mx-10 m-4 border border-blue-300 h-10 p-2 rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
        />
        <button 
          onClick={handleSubmit} 
          className="p-2 bg-blue-500 w-fit mx-auto mb-4 md:mb-6 border rounded-lg text-white text-lg md:text-xl font-semibold hover:bg-blue-600 transition-all"
        >
          Find Pilot Near Me
        </button>
      </div>
    </div>
    </DistanceContextProvider>
  );
};
