import React, { useEffect, useState } from 'react'
import { useSVGOverlay } from 'react-leaflet/SVGOverlay'
import pilot from '../../../../backend/src/models/pilot.model';


export const Show = ({latitude,longitude,distance}) => {

  const [data,setData]=useState([]);
    useEffect(()=>
    {
       const getData=async() =>{try
        {
            const response = await fetch(`http://localhost:8001/getData?latitude=${latitude}&longitude=${longitude}&distance=${distance}`, {
                method: 'GET',
                headers: {
                  'Content-Type': 'application/json',
                },
              });
              const data1=await response.json();
              setData(data1);
        }
        catch(err)
        {
           console.log(err);
        }
    }
    getData();
    },[])
  return (
    <div className="flex flex-col justify-center items-center w-full p-4 gap-6">
    {
      data.length!==0?data.map((pilot) => {
        return (
          <div key={pilot.id} className="w-full md:w-1/3 lg:w-1/4 border rounded-2xl shadow-lg shadow-blue-200 flex flex-col bg-white p-4">
            <img src={pilot.profileImage} alt={pilot.name} className="w-24 h-24 rounded-full mx-auto mb-4" />
            <h1 className="text-center text-xl font-bold">{pilot.name}</h1>
            <p className="text-center text-gray-500">Experience: {pilot.workExperience} years</p>
            <p className="text-center text-gray-700">{pilot.location}</p>
          </div>
        );
      }):<><h1 className='text-blue-500 font-bold text-xl'>No pilot found</h1></>
    }
  </div>
  
  )
}
