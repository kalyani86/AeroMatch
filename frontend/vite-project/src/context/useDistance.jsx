import {createContext, useState } from "react";

export const DistanceContext = createContext()
const DistanceContextProvider = ({children})=>
{
  const [Distance,setDistance]=useState(0);
  return(
     <DistanceContext.Provider value={{Distance,setDistance}}>
      {children}
     </DistanceContext.Provider>
  )
}
export default DistanceContextProvider


