import dotenv from 'dotenv'
import {db}  from './db/connection.js'
import express from 'express';
import pilot from './models/pilot.model.js';
import cors from 'cors'
const app=express();

app.use(cors())
dotenv.config(
    {
        path:'./.env'
    }
)

const port=process.env.PORT || 8001;
db()
.then(
    ()=>
    {
       
        app.listen(port,()=>
        {
            console.log(`connection succesful ${port}`);
        })
      

        app.get('/',async(req,res)=>
            {
                try {
                  //  console.log("get data")
                    const data=await pilot.find();
                    res.status(200).json({"data":data});
            
                } catch (error) {
                    console.log(error)
                }
            })

      
            app.get('/getData', async (req, res) => {
                try {
                  const { latitude, longitude, distance } = req.query;
              
                  if (!latitude || !longitude || !distance) {
                    return res.status(400).json({ error: 'Missing required parameters' });
                  }
              
                  const lat = parseFloat(latitude);
                  const lon = parseFloat(longitude);
                  const dist = parseFloat(distance); // Distance is in meters
              
                  console.log(`Latitude: ${lat}, Longitude: ${lon}, Distance: ${dist}`);
              
                
                  const earthRadius = 6371000;
                  const distanceInDegrees = dist / earthRadius * (180 / Math.PI);
              
             
                  const deltaLatitude = distanceInDegrees;
                  const minLatitude = lat - deltaLatitude;
                  const maxLatitude = lat + deltaLatitude;
              
                  const deltaLongitude = distanceInDegrees / Math.cos(lat * (Math.PI / 180));
                  const minLongitude = lon - deltaLongitude;
                  const maxLongitude = lon + deltaLongitude;
              
              
                  const data = await pilot.find({
                    'GeolocationCoordinates.latitude': { $gte: minLatitude, $lte: maxLatitude },
                    'GeolocationCoordinates.longitude': { $gte: minLongitude, $lte: maxLongitude },
                  })
                  .sort({ workExperience: -1 }) 
                  .limit(10);
              
                  res.status(200).json(data);
                } catch (err) {
                  console.error(err);
                  res.status(500).json({ error: 'Internal Server Error' });
                }
              });
              
    }
)
.catch(
    (err)=>
    {
        console.log("error in connection ")
        console.log(err);
    }
)



